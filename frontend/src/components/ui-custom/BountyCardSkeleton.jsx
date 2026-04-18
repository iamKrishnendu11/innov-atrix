import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function BountyCardSkeleton() {
    return (
        <div className="rounded-2xl bg-card border border-border p-5 soft-shadow">
            <div className="flex items-center justify-between mb-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <Skeleton className="h-5 w-4/5 mb-2" />
            <Skeleton className="h-4 w-full mb-1.5" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-14 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="flex justify-between pt-3 border-t border-border">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-24" />
            </div>
        </div>
    );
}