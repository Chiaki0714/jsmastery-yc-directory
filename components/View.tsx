import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import Ping from './Ping';
import { client } from '@/sanity/lib/client';
import { after } from 'next/server';
import { writeClient } from '@/sanity/lib/write-client';

export default async function View({ slug }: { slug: string }) {
  const { _id, views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { slug });

  after(
    async () =>
      await writeClient
        .patch(_id)
        .set({ views: totalViews + 1 })
        .commit()
  );

  return (
    <div className='view-container'>
      <div className='absolute -top-2 -right-2'>
        <Ping />
      </div>

      <p className='view-text'>
        <span className='font-black'>Views: {totalViews}</span>
      </p>
    </div>
  );
}
