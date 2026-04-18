import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Search,
    SlidersHorizontal,
    Building2,
    Calendar,
    IndianRupee,
    ArrowUpRight,
    BadgeCheck,
    X,
    CheckSquare,
    Home,
    Repeat2,
    FolderOpen,
    User,
    ChevronDown,
} from "lucide-react";
import { differenceInDays, format } from "date-fns";

// ── Dummy Data ────────────────────────────────────────────────────────────────
const DUMMY_BOUNTIES = [
    {
        id: "1",
        title: "Redesign SaaS landing page",
        description: "We need a fresh, modern landing page redesign for our analytics SaaS. Hero, features, pricing, and testimonial sections.",
        company_name: "Nova Studio",
        company_verified: true,
        skills_required: ["Figma", "UI/UX", "Web Design"],
        budget: 12000,
        deadline: "2025-05-10",
        category: "ui_ux",
    },
    {
        id: "2",
        title: "Build analytics dashboard in React",
        description: "Create an internal analytics dashboard using React + Recharts. Connect to provided JSON API endpoints.",
        company_name: "Urjaa Labs",
        company_verified: true,
        skills_required: ["React", "Recharts", "Tailwind"],
        budget: 28000,
        deadline: "2025-05-20",
        category: "web_dev",
    },
    {
        id: "3",
        title: "Data cleaning pipeline for CRM exports",
        description: "Build a Python pipeline to normalize messy CSV exports. Deduplicate leads, validate emails, output clean XLSX.",
        company_name: "AgriMantra",
        company_verified: true,
        skills_required: ["Python", "Pandas", "Data"],
        budget: 18500,
        deadline: "2025-05-05",
        category: "data",
    },
    {
        id: "4",
        title: "Mobile app UI in Flutter",
        description: "Implement 12 screens from our Figma prototype in Flutter. Pixel-perfect, with smooth navigation and animations.",
        company_name: "Kodo Tech",
        company_verified: false,
        skills_required: ["Flutter", "Dart", "Figma"],
        budget: 35000,
        deadline: "2025-06-01",
        category: "mobile",
    },
    {
        id: "5",
        title: "SEO content articles — 10 pieces",
        description: "Write 10 long-form SEO articles (1500+ words) targeting keywords in the fintech and personal finance niche.",
        company_name: "WealthNow",
        company_verified: true,
        skills_required: ["Content Writing", "SEO", "Research"],
        budget: 9000,
        deadline: "2025-04-28",
        category: "content",
    },
    {
        id: "6",
        title: "E-commerce product feed automation",
        description: "Script to sync WooCommerce product catalog to Google Merchant Center and Meta Catalog automatically daily.",
        company_name: "Bazaar Digital",
        company_verified: false,
        skills_required: ["Python", "APIs", "Automation"],
        budget: 22000,
        deadline: "2025-05-15",
        category: "web_dev",
    },
    {
        id: "7",
        title: "Instagram growth strategy & content calendar",
        description: "Build a 90-day Instagram growth plan with content calendar, hashtag research, and posting schedule for a D2C brand.",
        company_name: "Veda Naturals",
        company_verified: true,
        skills_required: ["Marketing", "Social Media", "Content"],
        budget: 7500,
        deadline: "2025-05-08",
        category: "marketing",
    },
    {
        id: "8",
        title: "Node.js REST API for inventory management",
        description: "Build a RESTful API with Node.js/Express and MongoDB for tracking warehouse inventory, orders, and suppliers.",
        company_name: "SwiftStock",
        company_verified: true,
        skills_required: ["Node.js", "MongoDB", "REST API"],
        budget: 45000,
        deadline: "2025-06-15",
        category: "web_dev",
    },
    {
        id: "9",
        title: "Brand identity & logo design",
        description: "Full brand identity package: logo (3 concepts), colour palette, typography, and brand usage guidelines PDF.",
        company_name: "Sunrise Exports",
        company_verified: false,
        skills_required: ["Logo Design", "Branding", "Illustrator"],
        budget: 14000,
        deadline: "2025-05-25",
        category: "ui_ux",
    },
];

const CATEGORIES = [
    { value: "all", label: "All skills" },
    { value: "ui_ux", label: "UI/UX" },
    { value: "web_dev", label: "Web Dev" },
    { value: "data", label: "Data" },
    { value: "mobile", label: "Mobile" },
    { value: "marketing", label: "Marketing" },
    { value: "content", label: "Content" },
];

const DEADLINES = [
    { value: "any", label: "Any deadline" },
    { value: "7", label: "Within 7 days" },
    { value: "30", label: "Within 30 days" },
    { value: "90", label: "Within 3 months" },
];

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const initial = (user.name || "U")[0].toUpperCase();

    return (
        <nav className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 border-r border-white/5 bg-neutral-900/40 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-40">
            <div className="p-8">
                <div className="text-2xl font-extrabold tracking-tighter bg-gradient-to-r from-[#ba9eff] to-[#699cff] bg-clip-text text-transparent">
                    Step-A-Ahead
                </div>
                <div className="text-xs text-white/30 tracking-wider uppercase mt-1 font-semibold">
                    Future of Work
                </div>
            </div>
            <div className="flex-1 px-4 space-y-2 mt-4">
                <Link to="/tasks" className="flex items-center gap-4 px-4 py-3 rounded-xl text-[#ba9eff] border-r-2 border-[#ba9eff] font-bold bg-white/5 transition-all">
                    <CheckSquare className="h-4 w-4" />
                    <span className="font-medium text-sm">Tasks</span>
                </Link>
                <Link to="/bounties" className="flex items-center gap-4 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-all group">
                    <Repeat2 className="h-4 w-4" />
                    <span className="font-medium text-sm">Bounties</span>
                </Link>
                <Link to="/projects" className="flex items-center gap-4 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-all group">
                    <FolderOpen className="h-4 w-4" />
                    <span className="font-medium text-sm">Projects</span>
                </Link>
                <Link to="/dashboard" className="flex items-center gap-4 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-all group">
                    <User className="h-4 w-4" />
                    <span className="font-medium text-sm">Profile</span>
                </Link>
            </div>

            {/* Profile score nudge */}
            <div className="mx-4 mb-4 p-4 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/10 border border-purple-500/20">
                <p className="text-xs font-bold text-white mb-1">Level up faster</p>
                <p className="text-[11px] text-white/40 leading-relaxed">
                    Complete a task this week to boost your profile score.
                </p>
            </div>

            <div className="p-6 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {initial}
                    </div>
                    <div className="min-w-0">
                        <div className="text-sm font-semibold text-white truncate">{user.name || "Guest"}</div>
                        <div className="text-xs text-white/30 truncate">{user.email || ""}</div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

// ── Bounty Card ───────────────────────────────────────────────────────────────
function TaskCard({ task, index }) {
    const deadline = task.deadline ? new Date(task.deadline) : null;
    const daysLeft = deadline ? differenceInDays(deadline, new Date()) : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
        >
            <Link to={`/task-detail/${task.id}`} className="block group h-full">
                <div className="relative h-full rounded-2xl bg-white/[0.03] border border-white/8 p-5 transition-all duration-300 hover:border-purple-500/30 hover:-translate-y-0.5 hover:bg-white/[0.05] hover:shadow-[0_8px_30px_rgba(186,158,255,0.08)]">
                    {/* Company row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2 text-xs text-white/40 min-w-0">
                            <Building2 className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{task.company_name}</span>
                            {task.company_verified && (
                                <span className="flex items-center gap-0.5 text-emerald-400 font-semibold">
                                    <BadgeCheck className="w-3.5 h-3.5" />
                                    Verified
                                </span>
                            )}
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-purple-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold text-white leading-snug mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                        {task.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-white/35 line-clamp-2 mb-4 leading-relaxed">
                        {task.description}
                    </p>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {task.skills_required.slice(0, 3).map((s) => (
                            <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 font-medium">
                                {s}
                            </span>
                        ))}
                        {task.skills_required.length > 3 && (
                            <span className="text-xs px-2.5 py-1 rounded-full bg-transparent border border-white/10 text-white/30">
                                +{task.skills_required.length - 3}
                            </span>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <div className="flex items-center gap-1 text-white font-bold text-sm">
                            <IndianRupee className="w-3.5 h-3.5" />
                            <span>{Number(task.budget).toLocaleString("en-IN")}</span>
                        </div>
                        {deadline && (
                            <div className={`flex items-center gap-1.5 text-xs font-medium ${daysLeft < 7 ? "text-rose-400" : "text-white/35"}`}>
                                <Calendar className="w-3.5 h-3.5" />
                                <span>
                                    {daysLeft >= 0 ? `${daysLeft}d left` : "Expired"} · {format(deadline, "MMM d")}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

// ── Custom Select ─────────────────────────────────────────────────────────────
function SelectDropdown({ value, onChange, options }) {
    const [open, setOpen] = useState(false);
    const selected = options.find((o) => o.value === value);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 h-11 px-4 bg-white/5 border border-white/10 rounded-xl text-sm text-white/60 hover:border-white/20 hover:text-white transition-all min-w-[9rem] justify-between"
            >
                <span>{selected?.label}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <div className="absolute top-full mt-1 left-0 bg-[#141318] border border-white/10 rounded-xl shadow-2xl z-20 min-w-[9rem] overflow-hidden">
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => { onChange(opt.value); setOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${opt.value === value ? "text-purple-300 bg-purple-500/10" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Budget Range Slider (custom) ──────────────────────────────────────────────
function BudgetSlider({ value, onChange, min = 0, max = 100000 }) {
    const pct = ((value - min) / (max - min)) * 100;

    return (
        <input
            type="range"
            min={min}
            max={max}
            step={1000}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{
                background: `linear-gradient(to right, #ba9eff ${pct}%, rgba(255,255,255,0.1) ${pct}%)`
            }}
        />
    );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function TaskMarketplace() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [deadline, setDeadline] = useState("any");
    const [maxBudget, setMaxBudget] = useState(100000);
    const [liveTasks, setLiveTasks] = useState([]);
    const [userSkills, setUserSkills] = useState([]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        const skillsArray = (storedUser.skills || "")
            .split(/[,\n]+/)
            .map(s => s.trim().toLowerCase())
            .filter(Boolean);
        setUserSkills(skillsArray);

        fetch("http://localhost:5000/api/tasks")
            .then((r) => r.json())
            .then((data) => {
                const list = (data.tasks || []).map((b) => ({
                    id: b._id,
                    title: b.title,
                    description: b.description,
                    company_name: b.msmeBusinessName || "MSME",
                    company_verified: b.msmeVerified || false,
                    skills_required: b.skill ? [b.skill] : [],
                    budget: b.budget,
                    deadline: b.deadline ? b.deadline.slice(0, 10) : null,
                    category: "all",
                }));
                setLiveTasks(list);
            })
            .catch(() => {});
    }, []);

    const allTasks = liveTasks.length > 0 ? liveTasks : DUMMY_BOUNTIES;

    const filtered = useMemo(() => {
        return allTasks.filter((b) => {
            // Skill match check
            const taskSkills = (b.skills_required || []).map(s => s.toLowerCase());
            // It matches if AT LEAST one of the user's skills matches the task skills, OR if there are no task skills defined
            const matchesSkills = taskSkills.length === 0 || taskSkills.some(ts => 
                userSkills.some(us => us.includes(ts) || ts.includes(us))
            );

            if (!matchesSkills) return false;

            const haystack = `${b.title} ${b.description} ${(b.skills_required || []).join(" ")} ${b.company_name}`.toLowerCase();
            if (search && !haystack.includes(search.toLowerCase())) return false;
            if (category !== "all" && b.category !== category) return false;
            if (Number(b.budget) > maxBudget) return false;
            if (deadline !== "any" && b.deadline) {
                const diff = differenceInDays(new Date(b.deadline), new Date());
                if (diff > Number(deadline)) return false;
            }
            return true;
        });
    }, [search, category, deadline, maxBudget, allTasks, userSkills]);

    const clearFilters = () => {
        setSearch("");
        setCategory("all");
        setDeadline("any");
        setMaxBudget(100000);
    };

    const hasActiveFilters = search || category !== "all" || deadline !== "any" || maxBudget < 100000;

    return (
        <div className="min-h-screen bg-[#0e0e0e] text-white font-sans">
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

            <Sidebar />

            <main className="md:pl-64 min-h-screen">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* ── Header ── */}
                <div className="mb-8">
                    <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-1">Marketplace</p>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Task Marketplace</h1>
                    <p className="text-white/40 mt-1 text-sm">Real projects from verified MSMEs — ship and get paid.</p>
                </div>

                {/* ── Filter bar ── */}
                <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-4 lg:p-5 mb-6">
                    {/* Row 1: search + dropdowns */}
                    <div className="flex flex-col lg:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by title, skill, or keyword"
                                className="w-full h-11 pl-9 pr-9 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-purple-500/40 transition-all"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                        <SelectDropdown value={category} onChange={setCategory} options={CATEGORIES} />
                        <SelectDropdown value={deadline} onChange={setDeadline} options={DEADLINES} />
                    </div>

                    {/* Row 2: budget slider */}
                    <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-white/35 min-w-[8.5rem]">
                            <SlidersHorizontal className="h-4 w-4" />
                            Budget range
                        </div>
                        <div className="flex-1">
                            <BudgetSlider value={maxBudget} onChange={setMaxBudget} />
                        </div>
                        <div className="text-sm font-semibold text-white tabular-nums min-w-[11rem] text-right">
                            ₹0 – ₹{maxBudget.toLocaleString("en-IN")}
                        </div>
                    </div>
                </div>

                {/* ── Count + clear ── */}
                <div className="flex items-center justify-between mb-5">
                    <p className="text-sm text-white/40">
                        <span className="text-white font-medium">{filtered.length}</span> tasks
                    </p>
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1.5"
                        >
                            <X className="h-3.5 w-3.5" />
                            Clear filters
                        </button>
                    )}
                </div>

                {/* ── Grid ── */}
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                            <Search className="h-6 w-6 text-white/20" />
                        </div>
                        <h3 className="text-base font-semibold text-white">No tasks match your filters</h3>
                        <p className="text-sm text-white/35 mt-1 max-w-xs">Try widening the budget range or clearing a filter.</p>
                        <button onClick={clearFilters} className="mt-5 px-5 py-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full transition-opacity hover:opacity-90">
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filtered.map((b, i) => (
                            <TaskCard key={b.id} task={b} index={i} />
                        ))}
                    </div>
                )}
                </div>
            </main>

            {/* Mobile bottom nav */}
            <nav className="md:hidden fixed bottom-0 w-full h-16 bg-[#0e0e0e]/90 backdrop-blur-xl border-t border-white/5 flex justify-around items-center z-50 px-2">
                <Link to="/tasks" className="flex flex-col items-center w-16 text-purple-400">
                    <CheckSquare className="h-5 w-5 mb-1" />
                    <span className="text-[10px] font-bold">Tasks</span>
                </Link>
                <Link to="/bounties" className="flex flex-col items-center w-16 text-white/40 hover:text-white transition-colors">
                    <Repeat2 className="h-5 w-5 mb-1" />
                    <span className="text-[10px]">Bounties</span>
                </Link>
                <Link to="/dashboard" className="flex flex-col items-center w-16 text-white/40 hover:text-white transition-colors">
                    <User className="h-5 w-5 mb-1" />
                    <span className="text-[10px]">Profile</span>
                </Link>
            </nav>

            <style>{`
                input[type=range]::-webkit-slider-thumb {
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #ba9eff;
                    cursor: pointer;
                    box-shadow: 0 0 0 3px rgba(186,158,255,0.2);
                }
                input[type=range]::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #ba9eff;
                    cursor: pointer;
                    border: none;
                }
            `}</style>
        </div>
    );
}