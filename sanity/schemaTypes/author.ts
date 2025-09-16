/**
 * Author ドキュメントのフィールド役割
 * - username: 表示用 (UI)
 * - slug: URL用 (ユニーク, ルーティング)
 * - _id: 内部管理用 (Sanity)
 * - githubId: GitHub OAuth連携用
 */

import { defineField, defineType } from 'sanity';
import { UserIcon } from 'lucide-react';

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'githubId',
      type: 'number',
    }),
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'username',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'username',
      },
      validation: Rule => Rule.required().error('Please enter a slug'),
    }),
    defineField({
      name: 'email',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'url',
    }),
    defineField({
      name: 'bio',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
});
