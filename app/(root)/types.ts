import { Author, Startup } from '@/sanity/types';

export type StartupFormState = {
  errors: Record<string, string[]>; // フィールドごとのエラー
  globalError: string; // 全体エラー (toast 用)
  status: 'INITIAL' | 'ERROR' | 'SUCCESS';
  slug?: string; // リダイレクト用の slug を追加
};

export type StartupFormFieldProps = {
  id: string;
  label: string;
  error?: string[];
  children: React.ReactNode;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement> & {
    [key: string]: unknown;
  }; // 公式の属性 + カスタム属性のみ通す
};

export type StartupCardType = Omit<Startup, 'author'> & { author?: Author };
