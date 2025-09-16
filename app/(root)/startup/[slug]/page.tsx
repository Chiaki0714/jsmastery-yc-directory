import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import markdownit from 'markdown-it';
import { formatDate, getAuthorUrl } from '@/lib/utils';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';

export const experimental_ppr = true;
export const revalidate = 60;

const md = markdownit();
const window = new JSDOM('').window;
const purify = DOMPurify(window);

export default async function Page({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const post = await client.fetch(STARTUP_BY_SLUG_QUERY, { slug });
  if (!post) return notFound();
  const { title, _createdAt, author, description, category, image, pitch } =
    post;

  const html = md.render(pitch || '');
  const parsedContent = purify.sanitize(html);

  return (
    <>
      <section className='pink_container !min-h-[230px]'>
        <p className='tag'>{formatDate(_createdAt)}</p>
        <h1 className='app-heading'>{title}</h1>
        <p className='sub-heading !max-w-5xl'>{description}</p>
      </section>

      <section className='section_container'>
        <div className='relative w-full'>
          <Image
            src={image}
            alt='thumbnail'
            width={16} // 仮の比率（例：16:9）
            height={9}
            sizes='(max-width: 1280px) 100vw, 1280px'
            className='rounded-xl h-auto w-full'
          />
        </div>

        <div className='mt-10 max-w-4xl mx-auto grid gap-5'>
          <div className='flex-between gap-5'>
            <Link
              href={getAuthorUrl(author?.slug.current)}
              className='flex gap-2 items-center'
            >
              <Image
                src={author?.image || 'https://avatar.iran.liara.run/public'}
                alt='avatar'
                width={64}
                height={64}
                className='rounded-full drop-shadow-lg'
              />

              <div>
                <p className='text-20-medium'>{author.name}</p>
                <p className='text-16-medium !text-black-300'>
                  @{author.username}
                </p>
              </div>
            </Link>

            <p className='category-tag'>{category}</p>
          </div>

          <h3 className='text-30-bold mt-3'>Pitch Details</h3>
          {parsedContent ? (
            <article
              className='prose max-w-4xl font-work-sans break-all'
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className='no-result'>No details provided</p>
          )}
        </div>

        <hr className='divider' />

        {/* TODO: EDITOR SELECTED STARTUPS */}

        <Suspense fallback={<Skeleton className='view_skeleton' />}>
          <View slug={slug} />
        </Suspense>
      </section>
    </>
  );
}
