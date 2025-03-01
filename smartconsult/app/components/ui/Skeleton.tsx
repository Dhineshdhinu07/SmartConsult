import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted/50',
        className
      )}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg border p-6 bg-card">
      <div className="space-y-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}

export function ConsultantCardSkeleton() {
  return (
    <div className="rounded-lg border p-6 bg-card">
      <div className="space-y-4">
        <Skeleton className="h-20 w-20 rounded-full mx-auto" />
        <Skeleton className="h-6 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
        <div className="flex justify-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-4" />
          ))}
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
} 