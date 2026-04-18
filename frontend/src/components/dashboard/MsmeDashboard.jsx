import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
    Briefcase,
    ListChecks,
    IndianRupee,
    Plus,
    Eye,
    Search,
    TrendingUp,
    Clock,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";
import MsmeDashboardLayout from "../layout/MsmeDashboardLayout";
import SkillTag from "../ui-custom/SkillTag";
import EmptyState from "../ui-custom/EmptyState";

// ── Status badge config ──────────────────────────────────────────────────────
const statusConfig = {
    open: {
        label: "Open",
        color: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
        dot: "bg-emerald-400",
    },
    in_review: {
        label: "In Review",
        color: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
        dot: "bg-amber-400",
    },
    closed: {
        label: "Closed",
        color: "bg-white/5 text-white/40 border border-white/10",
        dot: "bg-white/30",
    },
};

// ── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, accent }) {
    const accentClasses = {
        purple: "bg-purple-600/10 text-purple-400 border-purple-500/10",
        pink: "bg-pink-600/10 text-pink-400 border-pink-500/10",
        blue: "bg-blue-600/10 text-blue-400 border-blue-500/10",
    };

    return (
        <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-5 hover:bg-white/[0.05] transition-colors">
            <div className="flex items-start justify-between mb-4">
                <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center border ${accentClasses[accent]}`}
                >
                    <Icon className="h-4.5 w-4.5" />
                </div>
                <TrendingUp className="h-3.5 w-3.5 text-white/10" />
            </div>
            <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
            <p className="text-xs text-white/35 mt-0.5 font-medium">{label}</p>
        </div>
    );
}

// ── Main Dashboard ───────────────────────────────────────────────────────────
export default function MsmeDashboard() {
    const [bounties, setBounties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const msme = JSON.parse(localStorage.getItem("msme") || "{}");

    useEffect(() => {
        const token = localStorage.getItem("msme_accessToken");
        
        Promise.all([
            fetch(`${import.meta.env.VITE_API_URL || 'https://stepahead-9tra.onrender.com'}/api/bounties/my`, {
                headers: { Authorization: `Bearer ${token}` },
                credentials: "include",
            }).then((r) => r.json()),
            fetch(`${import.meta.env.VITE_API_URL || 'https://stepahead-9tra.onrender.com'}/api/tasks/my`, {
                headers: { Authorization: `Bearer ${token}` },
                credentials: "include",
            }).then((r) => r.json())
        ])
            .then(([bountiesData, tasksData]) => {
                const bountiesList = (bountiesData.bounties || []).map((b) => {
                    const obj = { ...b };
                    obj.id = b._id;
                    obj.skills = b.skill ? [b.skill] : [];
                    obj.itemType = "bounty";
                    return obj;
                });
                const tasksList = (tasksData.tasks || []).map((t) => {
                    const obj = { ...t };
                    obj.id = t._id;
                    obj.skills = t.skill ? [t.skill] : [];
                    obj.itemType = "task";
                    return obj;
                });
                
                // Combine and sort by createdAt descending
                const combined = [...bountiesList, ...tasksList].sort((a, b) => {
                    const dateA = new Date(a.createdAt || a.deadline || 0);
                    const dateB = new Date(b.createdAt || b.deadline || 0);
                    return dateB - dateA;
                });
                
                setBounties(combined);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const filtered = bounties.filter((b) => {
        const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = activeFilter === "all" || b.status === activeFilter;
        return matchesSearch && matchesFilter;
    });

    const stats = [
        {
            label: "Active postings",
            value: bounties.filter((b) => b.status === "open").length,
            icon: Briefcase,
            accent: "purple",
        },
        {
            label: "Total submissions",
            value: "—",
            icon: ListChecks,
            accent: "blue",
        },
        {
            label: "Budget posted",
            value: `₹${bounties
                .reduce((a, b) => a + Number(b.budget || 0), 0)
                .toLocaleString("en-IN")}`,
            icon: IndianRupee,
            accent: "pink",
        },
    ];

    return (
        <MsmeDashboardLayout>
            {/* ── Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                <div>
                    <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-1">
                        MSME Dashboard
                    </p>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        Hire verified talent
                    </h1>
                    <p className="text-sm text-white/35 mt-1">
                        Welcome back,{" "}
                        <span className="text-white/60 font-medium">{msme.businessName}</span>
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link
                        to="/msme/post-task"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-lg shadow-blue-900/30 w-fit"
                    >
                        <Plus className="h-4 w-4" />
                        Post a task
                    </Link>
                    <Link
                        to="/msme/post-bounty"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-lg shadow-purple-900/30 w-fit"
                    >
                        <Plus className="h-4 w-4" />
                        Post a bounty
                    </Link>
                </div>
            </div>

            {/* ── Stats ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {stats.map((s) => (
                    <StatCard key={s.label} {...s} />
                ))}
            </div>

            {/* ── Bounty table ── */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden">
                {/* Table header row */}
                <div className="px-5 py-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h2 className="font-semibold text-white text-sm">Your bounties & tasks</h2>

                    <div className="flex items-center gap-2 flex-wrap">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/25" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-8 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-white/25 focus:outline-none focus:border-purple-500/40 w-36 transition-all"
                            />
                        </div>

                        {/* Filters */}
                        {["all", "open", "in_review", "closed"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all capitalize ${activeFilter === f
                                    ? "bg-purple-600/20 text-purple-300 border border-purple-500/25"
                                    : "text-white/30 hover:text-white hover:bg-white/5 border border-transparent"
                                    }`}
                            >
                                {f === "in_review" ? "In Review" : f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading skeletons */}
                {loading ? (
                    <div className="p-5 space-y-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-16 rounded-xl bg-white/5 animate-pulse"
                            />
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="p-8">
                        <EmptyState
                            icon={Briefcase}
                            title="No records found"
                            description={
                                bounties.length === 0
                                    ? "Post your first bounty or task and start hiring in days, not months."
                                    : "No records match your current filter."
                            }
                            action={
                                bounties.length === 0 ? (
                                    <div className="flex gap-3">
                                        <Link
                                            to="/msme/post-task"
                                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Post a Task
                                        </Link>
                                        <Link
                                            to="/msme/post-bounty"
                                            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Post a Bounty
                                        </Link>
                                    </div>
                                ) : null
                            }
                        />
                    </div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {filtered.map((b) => {
                            const status = statusConfig[b.status] || statusConfig.closed;
                            return (
                                <div
                                    key={b.id}
                                    className="flex flex-col md:flex-row md:items-center gap-3 px-5 py-4 hover:bg-white/[0.025] transition-colors"
                                >
                                    {/* Left: title + skills */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                                                b.itemType === 'bounty' 
                                                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20' 
                                                : 'bg-blue-500/20 text-blue-400 border border-blue-500/20'
                                            }`}>
                                                {b.itemType === 'bounty' ? 'Bounty' : 'Task'}
                                            </span>
                                            <p className="font-semibold text-white text-sm truncate">
                                                {b.title}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                            {b.skills.slice(0, 4).map((s) => (
                                                <SkillTag key={s}>{s}</SkillTag>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right: meta */}
                                    <div className="flex items-center gap-4 text-sm flex-shrink-0 flex-wrap">
                                        {/* Budget */}
                                        <span className="font-bold text-white text-sm">
                                            ₹{Number(b.budget || 0).toLocaleString("en-IN")}
                                        </span>

                                        {/* Deadline */}
                                        <span className="text-white/30 text-xs flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {b.deadline
                                                ? format(new Date(b.deadline), "MMM d")
                                                : "—"}
                                        </span>

                                        {/* Status */}
                                        <span
                                            className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5 ${status.color}`}
                                        >
                                            <span
                                                className={`w-1.5 h-1.5 rounded-full ${status.dot}`}
                                            />
                                            {status.label}
                                        </span>

                                        {/* View button */}
                                        <Link
                                            to={b.itemType === 'bounty' ? `/bounty-detail/${b.id}` : `/task-detail/${b.id}`}
                                            className="p-1.5 rounded-full text-white/30 hover:text-white hover:bg-white/10 transition-all"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ── Quick actions ── */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-gradient-to-br from-purple-600/10 to-pink-600/5 border border-purple-500/15 p-5 flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                        <p className="font-semibold text-white text-sm">Review submissions</p>
                        <p className="text-xs text-white/35 mt-0.5">
                            View and accept student applications to your tasks.
                        </p>
                        <Link
                            to="/msme/submissions"
                            className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 mt-2 font-medium transition-colors"
                        >
                            Go to Submissions →
                        </Link>
                    </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-blue-600/10 to-purple-600/5 border border-blue-500/15 p-5 flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                        <p className="font-semibold text-white text-sm">Complete your profile</p>
                        <p className="text-xs text-white/35 mt-0.5">
                            Add your business details to attract top student talent.
                        </p>
                        <button className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 mt-2 font-medium transition-colors">
                            Edit Profile →
                        </button>
                    </div>
                </div>
            </div>
        </MsmeDashboardLayout>
    );
}
