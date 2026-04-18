import React from 'react';

export default function SkillTag({ children, variant = 'default' }) {
    const variants = {
        default: 'bg-accent text-accent-foreground',
        outline: 'bg-transparent border border-border text-foreground',
        gradient: 'brand-gradient text-white'
    };
    return (
        <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${variants[variant]}`}>
            {children}
        </span>
    );
}