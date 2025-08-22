'use client';

import { X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SearchFormReset() {
  const router = useRouter();
  const reset = () => {
    const form = document.querySelector('.search-form') as HTMLFormElement;
    if (form) form.reset();
    router.push('/');
  };

  return (
    <button type='reset' onClick={reset} className='search-btn text-white'>
      <X />
    </button>
  );
}
