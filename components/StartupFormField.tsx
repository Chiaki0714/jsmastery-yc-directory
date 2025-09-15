import type { StartupFormFieldProps } from '@/app/(root)/startup/types';

export default function StartupFormField({
  id,
  label,
  error,
  children,
  wrapperProps,
}: StartupFormFieldProps) {
  return (
    <div {...wrapperProps}>
      <label htmlFor={id} className='startup-form_label'>
        {label}
      </label>
      {children}
      {error && <p className='startup-form_error'>{error?.[0]}</p>}
    </div>
  );
}
