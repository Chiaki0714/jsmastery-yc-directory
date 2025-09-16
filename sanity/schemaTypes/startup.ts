/**
 * Startup ドキュメントのフィールド役割
 * - title: 投稿のタイトル (必須)
 * - slug: URL用のユニークID (titleから生成 + ランダム文字列)
 * - author: 投稿したユーザーへの参照 (reference → Author._id)
 * - views: 閲覧数 (初期値0, 自動でカウントアップ)
 * - description: 投稿の説明文 (短文)
 * - category: 投稿のカテゴリ (必須, 1〜20文字)
 * - image: サムネイル画像URL (必須)
 * - pitch: 本文 (Markdownでリッチテキストを表現)
 *
 * 補足:
 * - URLリンクは `slug.current` を利用
 * - 内部管理・参照には `_id` を利用
 * - author フィールドには Sanity の Author._id が入る
 */

import { defineField, defineType } from 'sanity';

export const startup = defineType({
  name: 'startup',
  title: 'Startup',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required().error('Please enter a title'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: Rule => Rule.required().error('Please enter a slug'),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'views',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'category',
      type: 'string',
      validation: Rule =>
        Rule.min(1).max(20).required().error('Please enter a category'),
    }),
    defineField({
      name: 'image',
      type: 'url',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'pitch',
      type: 'markdown',
    }),
  ],
});
