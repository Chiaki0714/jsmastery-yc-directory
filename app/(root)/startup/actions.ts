'use server';

import { auth } from '@/auth';

import { formSchema } from '@/lib/validation';
import { writeClient } from '@/sanity/lib/write-client';
import type { StartupFormState } from './types';
import { generateUniqueSlug } from '@/lib/utils';

export async function createStartup(
  prevState: StartupFormState,
  formData: FormData
): Promise<StartupFormState> {
  // ログインチェック
  const session = await auth();
  if (!session) {
    return {
      ...prevState,
      errors: { form: ['You must be signed in to create a startup'] },
      globalError: '',
      status: 'ERROR',
    };
  }

  // FormData → 普通のオブジェクトに変換
  const data = {
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category'),
    link: formData.get('link'),
    pitch: formData.get('pitch'),
  };

  // Zodでバリデーションチェック
  //   type SafeParseReturn<T> =
  //     | { success: true; data: T }
  //     | { success: false; error: ZodError };
  const result = await formSchema.safeParseAsync(data);

  // 失敗時
  if (!result.success) {
    return {
      ...prevState,
      errors: result.error.flatten().fieldErrors,
      globalError: '',
      status: 'ERROR',
    };
  }

  // 成功時
  const validData = result.data;

  // Slug 生成
  const slug = generateUniqueSlug(validData.title);

  // 保存するドキュメントを組み立て
  const startup = {
    _type: 'startup',
    title: validData.title,
    description: validData.description,
    category: validData.category,
    image: validData.link,
    slug: {
      _type: 'slug',
      current: slug,
    },
    author: {
      _type: 'reference',
      _ref: session.user.id, // ← 認証情報からユーザーIDを参照
    },
    pitch: validData.pitch,
  };

  try {
    // Sanity に保存
    await writeClient.create(startup);

    return {
      ...prevState,
      status: 'SUCCESS',
      slug,
    };
  } catch (error) {
    console.error(error);
    return {
      ...prevState,
      errors: { form: ['An unexpected error occurred'] },
      status: 'ERROR',
    };
  }
}
