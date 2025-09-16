import {
  formatDate,
  getStartupUrl,
  getAuthorUrl,
  getCategoryUrl,
} from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { Author, Startup } from '@/sanity/types';

export type StartupType = Omit<Startup, 'author'> & { author?: Author };

export default function StartupCard({ post }: { post: StartupType }) {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    slug,
    image,
    description,
  } = post;

  const startupUrl = getStartupUrl(slug?.current ?? '');
  const authorUrl = getAuthorUrl(author?.slug?.current);
  const categoryUrl = getCategoryUrl(category);
  const displayViews = views && views > 0 ? views - 1 : 0;

  return (
    <li className='startup-card group'>
      <div className='flex-between'>
        <p className='startup_card_date'>{formatDate(_createdAt)}</p>
        <div className='flex gap-1.5'>
          <EyeIcon className='size-6 text-primary' />
          <span className='text-16-medium'>{displayViews}</span>
        </div>
      </div>

      <div className='flex-between mt-5 gap-5'>
        <div className='flex-1'>
          <Link href={authorUrl}>
            <p className='text-16-medium line-clamp-1'>{author?.name}</p>
          </Link>
          <Link href={startupUrl}>
            <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
          </Link>
        </div>
        <Link href={authorUrl}>
          <Image
            src={author?.image || 'https://avatar.iran.liara.run/public'}
            alt='avatar'
            width={48}
            height={48}
            className='rounded-full'
          />
        </Link>
      </div>

      <Link href={startupUrl}>
        <p className='startup-card_desc'>{description}</p>
        <div className='startup-card_img'>
          <Image
            src={image || 'https://placehold.jp/400x250.png'}
            alt={title || 'Startup Project'}
            fill
          />
        </div>
      </Link>

      <div className='flex-between gap-3 mt-5'>
        <Link href={categoryUrl}>
          <p className='text-16-medium'>{category}</p>
        </Link>
        <Button className='startup-card_btn' asChild>
          <Link href={startupUrl}>Details</Link>
        </Button>
      </div>
    </li>
  );
}
