import { auth } from '@/auth';
import StartupForm from '@/components/StartupForm';
import { redirect } from 'next/navigation';

// type StartupFormErrors = {
//   title?: string;
//   description?: string;
//   url?: string;
// };

export default async function Page() {
  const session = await auth();
  if (!session) redirect('/');

  return (
    <>
      <section className='pink_container !min-h-[230px]'>
        <h1 className='app-heading'>Submit Your Startup</h1>
      </section>

      <StartupForm />
    </>
  );
}
