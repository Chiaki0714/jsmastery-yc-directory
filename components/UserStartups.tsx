import { StartupCardType } from '@/app/(root)/types';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_AUTHOR_ID_QUERY } from '@/sanity/lib/queries';
import StartupCard from './StartupCard';

export default async function UserStartups({ authorId }: { authorId: string }) {
  const startups = await client.fetch(STARTUP_BY_AUTHOR_ID_QUERY, { authorId });
  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StartupCardType) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className='no-result'>No posts yet</p>
      )}
    </>
  );
}
