export type StartupFormState = {
  errors: Record<string, string[]>; // フィールドごとのエラー
  globalError: string; // 全体エラー (toast 用)
  status: 'INITIAL' | 'ERROR' | 'SUCCESS';
  _id?: string;
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
