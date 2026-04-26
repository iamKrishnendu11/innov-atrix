import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ChevronLeft,
    Building2,
    BadgeCheck,
    IndianRupee,
    Calendar,
    Clock,
    Send,
    Paperclip,
    CheckCircle2
} from "lucide-react";
import { differenceInDays, format } from "date-fns";

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function TaskDetail() {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState("");
    const isMSME = !!localStorage.getItem("msme_accessToken");
    const [activeTab, setActiveTab] = useState(isMSME ? "smart-matches" : "details");
    const [workLink, setWorkLink] = useState("");
    const [notes, setNotes] = useState("");
    const [applied, setApplied] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [submissionCount, setSubmissionCount] = useState(0);
    const [mySubmission, setMySubmission] = useState(null);

    // AI Smart Match State
    const [aiMatches, setAiMatches] = useState([]);
    const [loadingAi, setLoadingAi] = useState(false);
    const [aiError, setAiError] = useState("");

    // Fetch submission is not needed since tasks do not natively support submissions right now
    const fetchSubmissions = async (taskId) => {
        // No-op for tasks placeholder
    };

    useEffect(() => {
        if (!id) { setFetchError("No task ID provided."); setLoading(false); return; }
        fetch(`http://localhost:5000/api/tasks/${id}`)
            .then((r) => {
                if (!r.ok) throw new Error("Task not found");
                return r.json();
            })
            .then((data) => {
                const b = data.task;
                setTask({
                    id: b._id,
                    title: b.title,
                    description: b.description,
                    company_name: b.msmeBusinessName || "MSME",
                    company_verified: b.msmeVerified || false,
                    company_bio: "",
                    skills_required: b.skill ? [b.skill] : [],
                    budget: b.budget,
                    deadline: b.deadline ? b.deadline.slice(0, 10) : null,
                    posted: b.createdAt ? b.createdAt.slice(0, 10) : null,
                    status: b.status || "open",
                });
            })
            .catch((err) => setFetchError(err.message))
            .finally(() => setLoading(false));

        fetchSubmissions(id);
    }, [id]);

    useEffect(() => {
        if (isMSME && activeTab === "smart-matches" && aiMatches.length === 0) {
            setLoadingAi(true);
            fetch(`http://localhost:5000/api/ai/match/${id}`)
                .then(r => r.json())
                .then(data => {
                    if (data.matches) {
                        setAiMatches(data.matches);
                    } else if (data.message) {
                        setAiError(data.message);
                    }
                })
                .catch(err => setAiError("Failed to fetch AI matches"))
                .finally(() => setLoadingAi(false));
        }
    }, [isMSME, activeTab, id]);

    // ── Loading ──
    if (loading) {
        return (
            <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // ── Error ──
    if (fetchError || !task) {
        return (
            <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center text-white">
                <div className="text-center">
                    <p className="text-lg font-semibold text-white/60 mb-3">{fetchError || "Task not found"}</p>
                    <Link to="/tasks" className="text-sm text-purple-400 hover:text-purple-300 underline underline-offset-2">
                        ← Back to marketplace
                    </Link>
                </div>
            </div>
        );
    }

    const deadline = task.deadline ? new Date(task.deadline) : null;
    const posted = task.posted ? new Date(task.posted) : null;
    const daysLeft = deadline ? differenceInDays(deadline, new Date()) : null;
    const companyInitial = (task.company_name || "M")[0].toUpperCase();

    const handleApply = async () => {
        setSubmittingApply(true);
        setApplyError("");
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) throw new Error("Please log in first.");

            const res = await fetch(`${import.meta.env.VITE_API_URL || 'https://stepahead-9tra.onrender.com'}/api/applications/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ notes: "I am interested in this task." })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to apply");
            setApplied(true);
        } catch (err) {
            setApplyError(err.message);
        } finally {
            setSubmittingApply(false);
        }
    };

    const tabs = isMSME ? [
        { id: "smart-matches", label: "Smart Matches ✨" },
        { id: "details", label: "Details" },
        { id: "discussion", label: "Discussion" },
    ] : [
        { id: "details", label: "Details" },
        { id: "discussion", label: "Discussion" },
    ];

    return (
        <div className="min-h-screen bg-[#0e0e0e] text-white font-sans">
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

            <main className="min-h-screen">
                <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-10">

                    {/* Back link */}
                    <Link
                        to="/tasks"
                        className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors mb-8 group"
                    >
                        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                        Back to marketplace
                    </Link>

                    {/* Two-column grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                        {/* ── Left column ── */}
                        <div className="xl:col-span-2 space-y-5">

                            {/* Hero header card */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35 }}
                                className="rounded-2xl bg-white/[0.03] border border-white/8 p-6 sm:p-8"
                            >
                                {/* Company row */}
                                <div className="flex items-center gap-2 text-sm text-white/40 mb-3">
                                    <Building2 className="w-4 h-4" />
                                    <span>{task.company_name}</span>
                                    {task.company_verified && (
                                        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                                            <BadgeCheck className="w-4 h-4" />
                                            Verified
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-4">
                                    {task.title}
                                </h1>

                                {/* Meta row */}
                                <div className="flex flex-wrap gap-5 text-sm text-white/50">
                                    <span className="flex items-center gap-1.5">
                                        <IndianRupee className="w-3.5 h-3.5 text-white" />
                                        <span className="text-white font-semibold">
                                            {Number(task.budget).toLocaleString("en-IN")}
                                        </span>
                                    </span>
                                    {deadline && (
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            Due {format(deadline, "MMM d, yyyy")}
                                        </span>
                                    )}
                                    {posted && (
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            Posted {format(posted, "MMM d")}
                                        </span>
                                    )}
                                </div>
                            </motion.div>

                            {/* Description card */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: 0.07 }}
                                className="rounded-2xl bg-white/[0.03] border border-white/8 p-6 sm:p-8"
                            >
                                <h2 className="text-base font-semibold text-white mb-3">Description</h2>
                                <p className="text-sm text-white/50 leading-relaxed mb-6">
                                    {task.description}
                                </p>

                                <h2 className="text-base font-semibold text-white mb-3">Required skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {task.skills_required.map((s) => (
                                        <span
                                            key={s}
                                            className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 font-medium"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Tab card */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: 0.14 }}
                                className="rounded-2xl bg-white/[0.03] border border-white/8 overflow-hidden"
                            >
                                {/* Tab nav */}
                                <div className="flex border-b border-white/8 px-6 pt-4 gap-1">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all ${
                                                activeTab === tab.id
                                                    ? "text-white bg-white/5 border border-white/10 border-b-0 -mb-px pb-[9px]"
                                                    : "text-white/40 hover:text-white/70"
                                            }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Tab content */}
                                <div className="p-6">
                                    {activeTab === "smart-matches" && (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-xl">✨</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-purple-300">Neural Smart Match</p>
                                                    <p className="text-xs text-purple-400/80 mt-0.5">AI has analyzed this task and found the best student fits from our platform.</p>
                                                </div>
                                            </div>

                                            {loadingAi ? (
                                                <div className="flex flex-col items-center justify-center py-10 space-y-3">
                                                    <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                                                    <p className="text-sm text-white/50">Analyzing candidates...</p>
                                                </div>
                                            ) : aiError ? (
                                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
                                                    <p className="text-sm text-red-400">{aiError}</p>
                                                </div>
                                            ) : aiMatches.length === 0 ? (
                                                <div className="text-center py-10">
                                                    <p className="text-sm text-white/50">No matches found.</p>
                                                </div>
                                            ) : (
                                                <div className="grid gap-4">
                                                    {aiMatches.map((match, idx) => (
                                                        <div key={idx} className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col md:flex-row gap-5 items-start md:items-center hover:bg-white/[0.06] transition-colors relative overflow-hidden">
                                                            {idx === 0 && (
                                                                <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-400 text-[10px] font-bold text-white uppercase tracking-wider rounded-bl-lg shadow-lg">
                                                                    Top Pick
                                                                </div>
                                                            )}
                                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                                                {match.student_name[0]?.toUpperCase() || "S"}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h3 className="text-base font-semibold text-white truncate">{match.student_name}</h3>
                                                                <p className="text-xs text-white/50 mt-1 line-clamp-1">{match.student_skills}</p>
                                                            </div>
                                                            <div className="flex items-center gap-6">
                                                                <div className="text-center">
                                                                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1.5">AI Similarity</p>
                                                                    <div className="inline-flex px-2 py-1 rounded bg-white/5 border border-white/10 text-xs font-semibold text-white/80">
                                                                        {match.ai_similarity?.toFixed(1) || "0.0"}%
                                                                    </div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1.5">Trust Score</p>
                                                                    <div className="inline-flex px-2.5 py-1 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-sm font-bold text-purple-300">
                                                                        {match.trust_score?.toFixed(1) || "0.0"}
                                                                    </div>
                                                                </div>
                                                                <button className="h-9 px-4 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap">
                                                                    View Profile
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {activeTab === "details" && (
                                        <div className="flex flex-col items-center justify-center py-10 text-center">
                                            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                                                <BadgeCheck className="w-7 h-7 text-purple-400" />
                                            </div>
                                            <h3 className="text-base font-semibold text-white mb-1">How to Apply</h3>
                                            <p className="text-sm text-white/40 mb-6 max-w-sm">
                                                For tasks, you work closely with the MSME. Click apply below to express your interest, and be sure to start a discussion in the discussion tab to demonstrate your skills.
                                            </p>
                                            {!isMSME && (
                                                <>
                                                    {applyError && (
                                                        <p className="text-rose-400 text-xs font-semibold mb-3">{applyError}</p>
                                                    )}

                                                    <button
                                                        onClick={handleApply}
                                                        disabled={applied || submittingApply}
                                                        className={`px-8 py-2.5 text-sm font-semibold rounded-full shadow-lg transition-all duration-300 ${
                                                            applied
                                                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-not-allowed"
                                                                : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 hover:scale-105 disabled:opacity-50"
                                                        }`}
                                                    >
                                                        {submittingApply ? "Sending..." : applied ? "Application Sent ✓" : "Apply to Task"}
                                                    </button>
                                                </>
                                            )}
                                            {isMSME && (
                                                <p className="text-sm text-emerald-400 font-semibold p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                                                    You are viewing your own task.
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {activeTab === "discussion" && (
                                        <div className="flex flex-col items-center justify-center py-14 text-center">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                                                <span className="text-white/20 text-xl">💬</span>
                                            </div>
                                            <p className="text-sm font-semibold text-white">No discussion yet</p>
                                            <p className="text-xs text-white/35 mt-1">Ask the employer a question.</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>

                        {/* ── Right column ── */}
                        <div className="space-y-5">

                            {/* Employer card */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: 0.1 }}
                                className="rounded-2xl bg-white/[0.03] border border-white/8 p-6"
                            >
                                <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">
                                    Employer
                                </p>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-base flex-shrink-0">
                                        {companyInitial}
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-white">{task.company_name}</div>
                                        {task.company_verified && (
                                            <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium mt-0.5">
                                                <BadgeCheck className="w-3 h-3" />
                                                Verified
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <p className="text-xs text-white/40 leading-relaxed">
                                    {task.company_bio}
                                </p>
                            </motion.div>

                            {/* Budget / CTA card */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: 0.18 }}
                                className="rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 p-6 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                                <div className="relative z-10">
                                    <p className="text-sm font-semibold text-white mb-0.5">Ready to ship?</p>
                                    <p className="text-xs text-white/60 mb-4">Submit your work before the deadline to qualify.</p>
                                    <div className="flex items-baseline gap-1 mb-1">
                                        <IndianRupee className="w-5 h-5 text-white" />
                                        <span className="text-3xl font-black text-white">
                                            {Number(task.budget).toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                    <p className="text-xs text-white/50">Budget · paid on acceptance</p>
                                </div>
                            </motion.div>

                            {/* Deadline info */}
                            {deadline && (
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35, delay: 0.24 }}
                                    className="rounded-2xl bg-white/[0.03] border border-white/8 p-5"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-white/50">
                                            <Calendar className="w-4 h-4" />
                                            Deadline
                                        </div>
                                        <span className={`text-sm font-semibold ${daysLeft !== null && daysLeft < 7 ? "text-rose-400" : "text-white"}`}>
                                            {daysLeft !== null && daysLeft >= 0
                                                ? `${daysLeft}d left`
                                                : "Expired"} · {format(deadline, "MMM d, yyyy")}
                                        </span>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}