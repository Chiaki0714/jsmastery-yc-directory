import NavBar from '../../components/NavBar';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className='fonr-work-sans'>
      <NavBar />
      {children}
    </main>
  );
}
