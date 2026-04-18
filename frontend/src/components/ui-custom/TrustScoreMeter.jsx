import React from 'react';
import { motion } from 'framer-motion';

export default function TrustScoreMeter({ score = 0, size = 140, strokeWidth = 10, label = 'Trust Score' }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const pct = Math.max(0, Math.min(100, score));
    const offset = circumference - (pct / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <div className="relative" style={{ width: size, height: size }}>
                <svg width={size} height={size} className="-rotate-90">
                    <defs>
                        <linearGradient id="trustGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="hsl(var(--brand-from))" />
                            <stop offset="100%" stopColor="hsl(var(--brand-to))" />
                        </linearGradient>
                    </defs>
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="hsl(var(--muted))"
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                    <motion.circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="url(#trustGradient)"
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold tracking-tight">{pct}</span>
                    <span className="text-[11px] text-muted-foreground">/ 100</span>
                </div>
            </div>
            {label && <span className="mt-3 text-sm font-medium text-muted-foreground">{label}</span>}
        </div>
    );
}