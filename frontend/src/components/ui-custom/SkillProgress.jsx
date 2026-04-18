import React from 'react';
import { motion } from 'framer-motion';

export default function SkillProgress({ name, level }) {
    const v = Math.max(0, Math.min(100, level || 0));
    return (
        <div>
            <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium text-foreground">{name}</span>
                <span className="text-xs font-semibold text-muted-foreground">{v}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <motion.div
                    className="h-full rounded-full brand-gradient"
                    initial={{ width: 0 }}
                    animate={{ width: `${v}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                />
            </div>
        </div>
    );
}