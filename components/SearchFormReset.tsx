'use client';

import { X } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function SearchFormReset() {
  const router = useRouter();
  const pathname = usePathname();

  const reset = () => {
    const form = document.querySelector('.search-form') as HTMLFormElement;
    if (form) form.reset();

    router.replace(pathname);
  };

  return (
    <button type='reset' onClick={reset} className='search-btn text-white'>
      <X />
    </button>
  );
}
