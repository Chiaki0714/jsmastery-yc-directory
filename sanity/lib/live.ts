// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import 'server-only';
import { defineLive } from 'next-sanity';
import { client } from './client';

const serverToken = process.env.SANITY_SERVER_TOKEN ?? undefined;
const browserToken = process.env.SANITY_BROWSER_TOKEN ?? undefined;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken,
  browserToken,
});
