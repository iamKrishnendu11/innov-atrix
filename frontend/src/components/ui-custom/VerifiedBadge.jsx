import React from 'react';
import { BadgeCheck } from 'lucide-react';

export default function VerifiedBadge({ label = 'Verified', className = '' }) {
    return (
        <span className={`inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2 py-0.5 rounded-full ${className}`}>
            <BadgeCheck className="w-3.5 h-3.5" />
            {label}
        </span>
    );
}