import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import slugify from 'slugify';
import { nanoid } from 'nanoid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export const getStartupUrl = (id: string) => `/startup/${id}`;
export const getAuthorUrl = (authorSlug?: string) =>
  authorSlug ? `/user/${authorSlug}` : '/user/unknown';
export const getCategoryUrl = (category?: string) =>
  category ? `/?query=${category.toLowerCase()}` : '/';

/**
 * ユニークなスラッグを生成するユーティリティ
 * @param base 元にする文字列（title, username など）
 * @param length ランダムIDの桁数（デフォルト 6）
 */
export function generateUniqueSlug(base: string, length = 6): string {
  return `${slugify(base, { lower: true, strict: true })}-${nanoid(length)}`;
}
