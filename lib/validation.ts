import { z } from 'zod';

export const formSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title must be 100 characters or less'),

  description: z
    .string()
    .min(20, 'Description must be at least 20 characters long')
    .max(500, 'Description must be 500 characters or less'),

  category: z
    .string()
    .min(3, 'Category must be at least 3 characters long')
    .max(20, 'Category must be 20 characters or less'),

  link: z
    .string()
    .url('Please enter a valid URL')
    .refine(
      async url => {
        try {
          const res = await fetch(url, { method: 'HEAD' });
          const contentType = res.headers.get('content-type');
          return contentType?.startsWith('image/');
        } catch {
          return false;
        }
      },
      { message: 'The link must point to a valid image' }
    ),

  pitch: z.string().min(10, 'Pitch must be at least 10 characters long'),
});
