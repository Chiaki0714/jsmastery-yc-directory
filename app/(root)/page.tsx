import SearchForm from '@/components/SearchForm';
import StartupCard from '@/components/StartupCard';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';
import { StartupCardType } from '@/app/(root)/types';
// import { auth } from '@/auth';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  const params = { search: query || null };
  // const posts = await client.fetch(STARTUPS_QUERY);
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  // auth():https://authjs.dev/getting-started/migrating-to-v5
  // const session = await auth();
  // console.log(session?.user.id);

  return (
    <>
      <SanityLive />
      <section className='pink_container'>
        <p className='tag'>Pitch, Vote, And Grow</p>
        <h1 className='app-heading'>
          Pitch Your Startup, <br />
          Connect With Enterpreneurs
        </h1>
        <p className='sub-heading'>
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
        </p>
        <SearchForm query={query} />
      </section>

      <section className='section_container'>
        <p className='text-30-semibold'>
          {query ? `Search result for ${query}` : 'All Startups'}
        </p>

        <ul className='mt-7 card_grid'>
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className='no-results'></p>
          )}
        </ul>
      </section>
    </>
  );
}
