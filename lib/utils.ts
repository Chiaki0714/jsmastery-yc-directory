import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
export const getAuthorUrl = (authorId?: string) =>
  authorId ? `/user/${authorId}` : '/user/unknown';
export const getCategoryUrl = (category?: string) =>
  category ? `/?query=${category.toLowerCase()}` : '/';
