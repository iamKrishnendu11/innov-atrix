import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, IndianRupee, ArrowUpRight, Building2 } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import SkillTag from './SkillTag';
import VerifiedBadge from './VerifiedBadge';
import { motion } from 'framer-motion';

export default function BountyCard({ bounty, index = 0 }) {
    const deadline = bounty.deadline ? new Date(bounty.deadline) : null;
    const daysLeft = deadline ? differenceInDays(deadline, new Date()) : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
        >
            <Link to={`/bounty/${bounty.id}`} className="block group">
                <div className="relative h-full rounded-2xl bg-card border border-border p-5 transition-all duration-300 hover:border-primary/30 hover:-translate-y-0.5 soft-shadow hover:soft-shadow-lg">
                    <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
                            <Building2 className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{bounty.company_name || 'MSME Partner'}</span>
                            {bounty.company_verified && <VerifiedBadge />}
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>

                    <h3 className="text-base font-semibold text-foreground leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {bounty.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {bounty.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {(bounty.skills_required || []).slice(0, 3).map((s) => (
                            <SkillTag key={s}>{s}</SkillTag>
                        ))}
                        {(bounty.skills_required || []).length > 3 && (
                            <SkillTag variant="outline">+{bounty.skills_required.length - 3}</SkillTag>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-1 text-foreground font-semibold">
                            <IndianRupee className="w-4 h-4" />
                            <span>{Number(bounty.budget || 0).toLocaleString('en-IN')}</span>
                        </div>
                        {deadline && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>
                                    {daysLeft >= 0 ? `${daysLeft}d left` : 'Expired'} · {format(deadline, 'MMM d')}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}