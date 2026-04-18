import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search, SlidersHorizontal } from 'lucide-react';
import BountyCard from '@/components/ui-custom/BountyCard';
import BountyCardSkeleton from '@/components/ui-custom/BountyCardSkeleton';
import EmptyState from '@/components/ui-custom/EmptyState';

const CATEGORIES = [
    { value: 'all', label: 'All skills' },
    { value: 'ui_ux', label: 'UI/UX' },
    { value: 'web_dev', label: 'Web Dev' },
    { value: 'data', label: 'Data' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'content', label: 'Content' },
];

const DEADLINES = [
    { value: 'any', label: 'Any deadline' },
    { value: '7', label: 'Within 7 days' },
    { value: '30', label: 'Within 30 days' },
    { value: '90', label: 'Within 3 months' },
];

export default function Bounties() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [deadline, setDeadline] = useState('any');
    const [budget, setBudget] = useState([0, 100000]);

    const { data: bounties, isLoading } = useQuery({
        queryKey: ['bounties', 'all'],
        queryFn: () => base44.entities.Bounty.list('-created_date', 50),
        initialData: [],
    });

    const filtered = useMemo(() => {
        return bounties.filter((b) => {
            if (search && !(`${b.title} ${b.description} ${(b.skills_required || []).join(' ')}`).toLowerCase().includes(search.toLowerCase())) return false;
            if (category !== 'all' && b.category !== category) return false;
            const bd = Number(b.budget || 0);
            if (bd < budget[0] || bd > budget[1]) return false;
            if (deadline !== 'any' && b.deadline) {
                const diff = (new Date(b.deadline) - new Date()) / (1000 * 60 * 60 * 24);
                if (diff > Number(deadline)) return false;
            }
            return true;
        });
    }, [bounties, search, category, deadline, budget]);

    return (
        <div className="px-4 lg:px-8 py-8 max-w-7xl mx-auto w-full">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Bounty Marketplace</h1>
                <p className="text-muted-foreground mt-1">Real projects from verified MSMEs — ship and get paid.</p>
            </div>

            <div className="rounded-2xl bg-card border border-border p-4 lg:p-5 soft-shadow mb-6">
                <div className="flex flex-col lg:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title, skill, or keyword"
                            className="pl-9 h-11 rounded-xl"
                        />
                    </div>
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="lg:w-44 h-11 rounded-xl"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {CATEGORIES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Select value={deadline} onValueChange={setDeadline}>
                        <SelectTrigger className="lg:w-44 h-11 rounded-xl"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {DEADLINES.map((d) => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>

                <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground min-w-[10rem]">
                        <SlidersHorizontal className="h-4 w-4" /> Budget range
                    </div>
                    <div className="flex-1">
                        <Slider value={budget} onValueChange={setBudget} min={0} max={100000} step={1000} />
                    </div>
                    <div className="text-sm font-semibold tabular-nums min-w-[11rem] text-right">
                        ₹{budget[0].toLocaleString('en-IN')} – ₹{budget[1].toLocaleString('en-IN')}
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">{filtered.length} bounties</p>
                <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => { setSearch(''); setCategory('all'); setDeadline('any'); setBudget([0, 100000]); }}>
                    Clear filters
                </Button>
            </div>

            {isLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 9 }).map((_, i) => <BountyCardSkeleton key={i} />)}
                </div>
            ) : filtered.length === 0 ? (
                <EmptyState title="No bounties match your filters" description="Try widening the budget range or clearing a filter." />
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((b, i) => <BountyCard key={b.id} bounty={b} index={i} />)}
                </div>
            )}
        </div>
    );
}