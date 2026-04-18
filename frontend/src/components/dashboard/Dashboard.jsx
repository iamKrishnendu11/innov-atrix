import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";

// ── Helper: initials avatar ──────────────────────────────────────────────────
function InitialsAvatar({ name, size = "w-32 h-32 md:w-40 md:h-40" }) {
    const initials = (name || "U")
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    return (
        <div
            className={`${size} rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white text-3xl font-extrabold`}
        >
            {initials}
        </div>
    );
}

// ── Skill bar ────────────────────────────────────────────────────────────────
function SkillBar({ skill, index }) {
    const colors = [
        { bar: "from-[#ba9eff] to-[#ae8dff]", label: "text-primary" },
        { bar: "from-[#699cff] to-[#5580e0]", label: "text-secondary" },
        { bar: "from-[#ff97b5] to-[#e0789a]", label: "text-tertiary" },
        { bar: "from-[#8455ef] to-[#6e3bd7]", label: "text-primary-dim" },
    ];
    const c = colors[index % colors.length];
    // Fake a deterministic width from the skill name length for visual variety
    const width = Math.min(95, 60 + (skill.length % 10) * 4);

    return (
        <div>
            <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-semibold text-on-surface">{skill}</span>
                <span className={`text-xs font-bold ${c.label}`}>{width}%</span>
            </div>
            <div className="h-1.5 w-full bg-surface-container-lowest rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`h-full bg-gradient-to-r ${c.bar} rounded-full`}
                />
            </div>
        </div>
    );
}

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("accessToken");
            const storedUser = localStorage.getItem("user");

            if (!token && !storedUser) {
                navigate("/login");
                return;
            }

            // Use cached user immediately for instant render
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                setLoading(false);
            }

            // Then refresh from backend for latest data
            if (token) {
                try {
                    const res = await fetch("http://localhost:5000/api/users/me", {
                        headers: { Authorization: `Bearer ${token}` },
                        credentials: "include",
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setUser(data.user);
                        localStorage.setItem("user", JSON.stringify(data.user));
                    } else if (res.status === 401) {
                        // Token expired — clear and redirect
                        localStorage.removeItem("user");
                        localStorage.removeItem("accessToken");
                        navigate("/login");
                    }
                } catch {
                    // Silently use cached data if network fails
                }
            }
        };

        fetchUser();
    }, [navigate]);

    if (loading || !user) {
        return (
            <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#ba9eff] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // ── Derived data ──
    const trustScore = 89; // placeholder until trust-score API exists
    const rating = 4.7;
    const pieData = [
        { value: trustScore },
        { value: 100 - trustScore },
    ];
    const scoreColor = trustScore > 80 ? "#22c55e" : trustScore > 50 ? "#f59e0b" : "#ef4444";

    // Parse skills string → array (comma or newline separated)
    const skillsList = user.skills
        ? user.skills.split(/[,\n]+/).map((s) => s.trim()).filter(Boolean)
        : [];

    // Build ecosystem links from user profile fields
    const ecosystemLinks = [
        user.portfolioLink && {
            href: user.portfolioLink,
            icon: "language",
            label: user.portfolioLink.replace(/^https?:\/\//, ""),
            hoverColor: "group-hover:text-primary",
        },
        user.githubUrl && {
            href: user.githubUrl,
            icon: "code",
            label: "GitHub Profile",
            hoverColor: "group-hover:text-white",
        },
        user.linkedinUrl && {
            href: user.linkedinUrl,
            icon: "work",
            label: "LinkedIn Profile",
            hoverColor: "group-hover:text-[#0077b5]",
        },
    ].filter(Boolean);

    return (
        <div>
            <style dangerouslySetInnerHTML={{
                __html: `
                    body { font-family: 'Inter', sans-serif; }
                    .nebula-shadow { box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 15px rgba(186, 158, 255, 0.05); }
                    .glass-panel { backdrop-filter: blur(20px); background-color: rgba(38, 38, 38, 0.4); }
                    .ghost-border { border: 1px solid rgba(73, 72, 71, 0.15); }
                    .card-gradient { background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%); }
                `
            }} />

            {/* ── Top Nav (Mobile) ── */}
            <nav className="md:hidden w-full h-16 fixed top-0 z-50 bg-[#0e0e0e]/80 backdrop-blur-lg flex items-center justify-between px-6 shadow-xl border-b border-outline-variant/10">
                <div className="text-2xl font-black bg-gradient-to-br from-[#ba9eff] to-[#699cff] bg-clip-text text-transparent tracking-tighter">
                    Step-A-Ahead
                </div>
            </nav>

            {/* ── Sidebar ── */}
            <nav className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 border-r border-white/5 bg-neutral-900/40 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_15px_rgba(186,158,255,0.05)] z-40">
                <div className="p-8">
                    <div className="text-2xl font-extrabold tracking-tighter bg-gradient-to-r from-[#ba9eff] to-[#699cff] bg-clip-text text-transparent">
                        Step-A-Ahead
                    </div>
                    <div className="text-xs text-on-surface-variant tracking-wider uppercase mt-1 font-semibold opacity-70">
                        Future of Work
                    </div>
                </div>
                <div className="flex-1 px-4 space-y-2 mt-4">
                    <Link to="/" className="flex items-center gap-4 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-300 group">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 0' }}>home</span>
                        <span className="font-medium tracking-wide text-sm">Home</span>
                    </Link>
                    <Link to="/bounties" className="flex items-center gap-4 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-300 group">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 0' }}>rebase_edit</span>
                        <span className="font-medium tracking-wide text-sm">Bounties</span>
                    </Link>
                    <Link to="/bounties" className="flex items-center gap-4 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-300 group">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 0' }}>folder_open</span>
                        <span className="font-medium tracking-wide text-sm">Projects</span>
                    </Link>
                    <Link to="/dashboard" className="flex items-center gap-4 px-4 py-3 rounded-xl text-[#ba9eff] border-r-2 border-[#ba9eff] font-bold bg-white/5 transition-all duration-300">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>person</span>
                        <span className="font-medium tracking-wide text-sm">Profile</span>
                    </Link>
                </div>
                {/* Sidebar user card */}
                <div className="p-6 border-t border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            {(user.name || "U")[0].toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <div className="text-sm font-semibold text-on-surface truncate">{user.name}</div>
                            <div className="text-xs text-on-surface-variant truncate">{user.email}</div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* ── Main ── */}
            <main className="pt-20 pb-24 md:pt-10 md:pl-64 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* ── Profile Header ── */}
                    <motion.header
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative bg-surface-container-low rounded-3xl p-8 md:p-12 mb-8 overflow-hidden nebula-shadow border border-outline-variant/10"
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-8">
                            {/* Avatar */}
                            <div className="relative group">
                                <div className="border-2 border-primary/30 p-1 rounded-full relative z-10">
                                    <InitialsAvatar name={user.name} />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-surface-container-highest rounded-full p-2 border border-outline-variant/20 shadow-lg z-20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>verified</span>
                                </div>
                                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl group-hover:bg-primary/30 transition-colors duration-500 z-0" />
                            </div>

                            {/* Name & info */}
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-1">
                                    {user.name}
                                </h1>
                                <p className="text-sm text-on-surface-variant mb-1">{user.email}</p>
                                {user.phone && (
                                    <p className="text-sm text-on-surface-variant/60">{user.phone}</p>
                                )}
                            </div>

                            {/* Quick stats */}
                            <div className="flex gap-6 glass-panel p-6 rounded-2xl border border-outline-variant/10">
                                <div className="text-center">
                                    <div className="text-3xl font-black text-on-surface tracking-tighter">0</div>
                                    <div className="text-xs text-on-surface-variant uppercase tracking-widest mt-1">Bounties</div>
                                </div>
                                <div className="w-px bg-outline-variant/20" />
                                <div className="text-center">
                                    <div className="text-3xl font-black text-on-surface tracking-tighter">
                                        —
                                    </div>
                                    <div className="text-xs text-on-surface-variant uppercase tracking-widest mt-1">Earnings</div>
                                </div>
                            </div>
                        </div>
                    </motion.header>

                    {/* ── Bento Grid ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                        {/* Left column */}
                        <div className="lg:col-span-8 space-y-6">

                            {/* Connected Activity */}
                            <section className="bg-surface-container rounded-2xl p-6 md:p-8 ghost-border card-gradient relative overflow-hidden">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-on-surface flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 0' }}>code_blocks</span>
                                        Connected Activity
                                    </h2>
                                    <span className="text-xs font-semibold text-secondary px-3 py-1 bg-secondary/10 rounded-full border border-secondary/20">Live</span>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant/10">
                                        <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Tasks Completed</div>
                                        <div className="text-2xl font-bold text-on-surface">0</div>
                                    </div>
                                    <div className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant/10">
                                        <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Task Earnings</div>
                                        <div className="text-2xl font-bold text-on-surface">₹0</div>
                                    </div>
                                    {/* Trust Score donut */}
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant/10 flex flex-col items-center"
                                    >
                                        <div className="text-xs uppercase text-white mb-1">Trust Score</div>
                                        <div className="relative">
                                            <PieChart width={90} height={90}>
                                                <Pie data={pieData} innerRadius={27} outerRadius={40} startAngle={90} endAngle={-270} dataKey="value">
                                                    <Cell fill={scoreColor} />
                                                    <Cell fill="#111111" />
                                                </Pie>
                                            </PieChart>
                                            <div className="absolute inset-0 flex items-center justify-center font-bold text-white text-sm">
                                                {trustScore}%
                                            </div>
                                        </div>
                                    </motion.div>
                                    {/* Rating */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant/10 flex flex-col items-center justify-center"
                                    >
                                        <div className="text-xs uppercase text-white mb-2">Rating</div>
                                        <div className="flex text-tertiary text-sm">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <span key={i} className="material-symbols-outlined text-base" style={{ fontVariationSettings: '"FILL" 1' }}>
                                                    {rating >= i ? "star" : rating >= i - 0.5 ? "star_half" : "star_border"}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="text-sm mt-1 text-white">{rating}</div>
                                    </motion.div>
                                </div>
                            </section>

                            {/* About Me */}
                            {user.description && (
                                <motion.section
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-surface-container-low rounded-2xl p-6 ghost-border"
                                >
                                    <h2 className="text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-secondary text-xl" style={{ fontVariationSettings: '"FILL" 0' }}>person</span>
                                        About Me
                                    </h2>
                                    <p className="text-sm text-on-surface-variant leading-relaxed whitespace-pre-line">
                                        {user.description}
                                    </p>
                                </motion.section>
                            )}

                            {/* Past Experience */}
                            {user.pastExperiences && (
                                <motion.section
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-surface-container-low rounded-2xl p-6 ghost-border"
                                >
                                    <h2 className="text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-tertiary text-xl" style={{ fontVariationSettings: '"FILL" 0' }}>work_history</span>
                                        Past Experience
                                    </h2>
                                    <p className="text-sm text-on-surface-variant leading-relaxed whitespace-pre-line">
                                        {user.pastExperiences}
                                    </p>
                                </motion.section>
                            )}

                            {/* Recent Missions placeholder */}
                            <section className="bg-surface-container-low rounded-2xl p-6 md:p-8 ghost-border">
                                <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-3">
                                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: '"FILL" 0' }}>rocket_launch</span>
                                    Recent Missions
                                </h2>
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <div className="h-12 w-12 rounded-2xl bg-accent flex items-center justify-center mb-3">
                                        <span className="material-symbols-outlined text-on-surface-variant" style={{ fontVariationSettings: '"FILL" 0' }}>inbox</span>
                                    </div>
                                    <p className="text-sm font-semibold text-on-surface">No missions yet</p>
                                    <p className="text-xs text-on-surface-variant mt-1">Complete bounties to see them here</p>
                                    <Link
                                        to="/bounties"
                                        className="mt-4 px-5 py-2 text-xs font-semibold bg-gradient-to-r from-[#ba9eff] to-[#699cff] text-black rounded-full hover:opacity-90 transition-opacity"
                                    >
                                        Browse Bounties
                                    </Link>
                                </div>
                            </section>
                        </div>

                        {/* Right column */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Ecosystem Links */}
                            {ecosystemLinks.length > 0 && (
                                <section className="bg-surface-container-low rounded-2xl p-6 ghost-border">
                                    <h2 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-4">Ecosystem Links</h2>
                                    <ul className="space-y-3">
                                        {ecosystemLinks.map(({ href, icon, label, hoverColor }) => (
                                            <li key={href}>
                                                <a
                                                    href={href}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center gap-3 p-3 rounded-lg bg-surface-container hover:bg-surface-container-highest border border-transparent hover:border-outline-variant/20 transition-all group"
                                                >
                                                    <span className={`material-symbols-outlined text-on-surface-variant transition-colors ${hoverColor}`} style={{ fontVariationSettings: '"FILL" 0' }}>{icon}</span>
                                                    <span className={`text-sm font-medium text-on-surface truncate transition-colors ${hoverColor}`}>{label}</span>
                                                    <span className="material-symbols-outlined text-sm ml-auto text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontVariationSettings: '"FILL" 0' }}>arrow_outward</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {/* Skills / Combat Matrix */}
                            {skillsList.length > 0 && (
                                <section className="bg-surface-container-low rounded-2xl p-6 ghost-border card-gradient">
                                    <h2 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-6">Combat Matrix</h2>
                                    <div className="space-y-5">
                                        {skillsList.slice(0, 6).map((skill, i) => (
                                            <SkillBar key={skill} skill={skill} index={i} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* No links / skills placeholder */}
                            {ecosystemLinks.length === 0 && skillsList.length === 0 && (
                                <section className="bg-surface-container-low rounded-2xl p-6 ghost-border text-center">
                                    <p className="text-sm text-on-surface-variant">
                                        Complete your profile to show links and skills here.
                                    </p>
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* ── Bottom Nav (Mobile) ── */}
            <nav className="md:hidden fixed bottom-0 w-full h-16 bg-[#0e0e0e]/90 backdrop-blur-xl border-t border-outline-variant/10 flex justify-around items-center z-50 px-2">
                <Link to="/" className="flex flex-col items-center justify-center w-16 h-full text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: '"FILL" 0' }}>home</span>
                    <span className="text-[10px] font-medium">Home</span>
                </Link>
                <Link to="/bounties" className="flex flex-col items-center justify-center w-16 h-full text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: '"FILL" 0' }}>rebase_edit</span>
                    <span className="text-[10px] font-medium">Bounties</span>
                </Link>
                <Link to="/dashboard" className="flex flex-col items-center justify-center w-16 h-full text-primary">
                    <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: '"FILL" 1' }}>person</span>
                    <span className="text-[10px] font-bold">Profile</span>
                </Link>
            </nav>
        </div>
    );
};

export default Dashboard;