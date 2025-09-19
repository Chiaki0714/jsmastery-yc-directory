import { Skeleton } from './ui/skeleton';

export default function StartupCardSkeleton() {
  return (
    <>
      {[0, 1, 2, 3].map((index: number) => (
        <li key={`skeleton-${index}`}>
          <Skeleton className='startup-card_skeleton' />
        </li>
      ))}
    </>
  );
}
