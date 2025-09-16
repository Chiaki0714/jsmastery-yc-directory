import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { AUTHOR_BY_GITHUB_ID_QUERY } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { writeClient } from '@/sanity/lib/write-client';
import { generateUniqueSlug } from './lib/utils';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({
      user: { name, email, image },
      profile: { id, login, bio },
    }) {
      const user = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          githubId: id,
        });

      if (!user) {
        await writeClient.create({
          _type: 'author',
          githubId: id,
          name,
          slug: {
            _type: 'slug',
            current: generateUniqueSlug(login),
          },
          username: login,
          email,
          image,
          bio: bio || '',
        });
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            githubId: profile?.id,
          });

        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }) {
      // Object.assign(session, { id: token.id });
      // return session;
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
