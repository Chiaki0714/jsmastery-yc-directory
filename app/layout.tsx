import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import { SanityLive } from '@/sanity/lib/live';
import './globals.css';
import 'easymde/dist/easymde.min.css';

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '400', '500', '600', '700', '800', '900'],
  variable: '--font-work-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'YC Directory',
  description: 'Pitch, Vote and Grow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={workSans.variable} suppressHydrationWarning>
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
