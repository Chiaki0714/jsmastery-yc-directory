export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01';

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
);

export const serverToken = process.env.SANITY_SERVER_TOKEN ?? undefined;
export const browserToken = process.env.SANITY_BROWSER_TOKEN ?? undefined;
export const writeToken = process.env.SANITY_WRITE_TOKEN ?? undefined;

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
