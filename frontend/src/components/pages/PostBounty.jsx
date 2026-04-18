import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FileText,
    IndianRupee,
    Tag,
    AlignLeft,
    CheckCircle2,
    Loader2,
    ArrowRight,
} from "lucide-react";
import MsmeDashboardLayout from "../layout/MsmeDashboardLayout";

const SKILLS = [
    "Web Development",
    "App Development",
    "Social Media Manager",
    "Marketing",
    "Video Editing",
    "SEO Optimizer",
    "Growth Strategist",
    "UI/UX Design",
    "Data Science",
    "Backend Engineering",
];

// ── Reusable field wrapper ─────────────────────────────────────────────────────
function Field({ label, required, children, hint }) {
    return (
        <div>
            <label className="block text-sm font-medium text-white/80 mb-1.5">
                {label}{required && <span className="text-pink-400 ml-0.5">*</span>}
            </label>
            {children}
            {hint && <p className="text-xs text-white/30 mt-1.5">{hint}</p>}
        </div>
    );
}

export default function PostBounty() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        budget: "",
        skill: "",
        deadline: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.title || !form.description || !form.budget || !form.skill) {
            setError("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("msme_accessToken");
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'https://stepahead-9tra.onrender.com'}/api/bounties`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify({
                    title:       form.title,
                    description: form.description,
                    budget:      Number(form.budget),
                    skill:       form.skill,
                    deadline:    form.deadline || undefined,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to post bounty");

            setSuccess(true);
            setTimeout(() => navigate("/msme/dashboard"), 2000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all";

    if (success) {
        return (
            <MsmeDashboardLayout>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center min-h-[60vh] text-center"
                >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-5">
                        <CheckCircle2 className="w-9 h-9 text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Bounty posted!</h2>
                    <p className="text-sm text-white/40">
                        Students can now discover and apply. Redirecting to dashboard…
                    </p>
                </motion.div>
            </MsmeDashboardLayout>
        );
    }

    return (
        <MsmeDashboardLayout>
            {/* Header */}
            <div className="mb-8">
                <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-1">
                    New Bounty
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Post a Bounty
                </h1>
                <p className="text-sm text-white/35 mt-1">
                    Fill in the details — verified students will be able to find and submit work.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* ── Form ── */}
                <motion.form
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="xl:col-span-2 space-y-6"
                >
                    {/* Title */}
                    <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-6 space-y-5">
                        <Field label="Bounty Title" required hint="Be specific — e.g. 'Build a React dashboard with Recharts'">
                            <div className="relative">
                                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25" />
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={set("title")}
                                    placeholder="e.g. Build a landing page in Figma"
                                    className={`${inputClass} pl-9`}
                                    maxLength={120}
                                />
                            </div>
                        </Field>

                        <Field label="Description" required hint="Describe what needs to be done, deliverables, and any constraints">
                            <div className="relative">
                                <AlignLeft className="absolute left-3 top-3 h-4 w-4 text-white/25" />
                                <textarea
                                    value={form.description}
                                    onChange={set("description")}
                                    placeholder="We need a fresh, modern redesign of our landing page. Deliverable: Figma file with desktop + mobile screens..."
                                    rows={5}
                                    className={`${inputClass} pl-9 resize-none`}
                                />
                            </div>
                        </Field>
                    </div>

                    {/* Budget + Deadline */}
                    <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-6 space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <Field label="Budget (₹)" required hint="Total payout on acceptance">
                                <div className="relative">
                                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25" />
                                    <input
                                        type="number"
                                        value={form.budget}
                                        onChange={set("budget")}
                                        placeholder="e.g. 12000"
                                        min={0}
                                        className={`${inputClass} pl-9`}
                                    />
                                </div>
                            </Field>

                            <Field label="Deadline" hint="Optional — leave blank if flexible">
                                <input
                                    type="date"
                                    value={form.deadline}
                                    onChange={set("deadline")}
                                    className={inputClass}
                                    style={{ colorScheme: "dark" }}
                                />
                            </Field>
                        </div>
                    </div>

                    {/* Skill */}
                    <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-6">
                        <Field label="Skill Category" required hint="Select the primary skill this bounty requires">
                            <div className="relative">
                                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25 pointer-events-none" />
                                <select
                                    value={form.skill}
                                    onChange={set("skill")}
                                    className={`${inputClass} pl-9 appearance-none cursor-pointer`}
                                >
                                    <option value="" disabled className="bg-[#141318]">Select a skill…</option>
                                    {SKILLS.map((s) => (
                                        <option key={s} value={s} className="bg-[#141318]">{s}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Skill chips preview */}
                            <div className="flex flex-wrap gap-2 mt-3">
                                {SKILLS.map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setForm((p) => ({ ...p, skill: s }))}
                                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                                            form.skill === s
                                                ? "bg-purple-600/20 border-purple-500/40 text-purple-300 font-semibold"
                                                : "bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/20"
                                        }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </Field>
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                            {error}
                        </p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-sm font-semibold rounded-full transition-all shadow-lg shadow-purple-900/30 disabled:opacity-60"
                    >
                        {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <ArrowRight className="h-4 w-4" />
                        )}
                        {loading ? "Posting…" : "Post Bounty"}
                    </button>
                </motion.form>

                {/* ── Preview card ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="space-y-4"
                >
                    <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-5">
                        <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">
                            Preview
                        </p>

                        <h3 className="text-base font-semibold text-white leading-snug mb-3 line-clamp-2 min-h-[2.5rem]">
                            {form.title || <span className="text-white/20">Your bounty title</span>}
                        </h3>

                        <p className="text-xs text-white/40 leading-relaxed line-clamp-3 mb-4 min-h-[3.5rem]">
                            {form.description || <span className="text-white/20">Description will appear here…</span>}
                        </p>

                        {form.skill && (
                            <span className="inline-block text-xs px-3 py-1 rounded-full bg-purple-600/15 border border-purple-500/25 text-purple-300 font-medium mb-4">
                                {form.skill}
                            </span>
                        )}

                        <div className="flex items-center justify-between pt-3 border-t border-white/5">
                            <div className="flex items-center gap-1 text-white font-bold text-sm">
                                <IndianRupee className="w-3.5 h-3.5" />
                                {form.budget
                                    ? Number(form.budget).toLocaleString("en-IN")
                                    : "—"}
                            </div>
                            {form.deadline && (
                                <span className="text-xs text-white/35">
                                    Due {new Date(form.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="rounded-2xl bg-gradient-to-br from-purple-600/10 to-pink-600/5 border border-purple-500/15 p-5 space-y-3">
                        <p className="text-xs font-semibold text-white/60 uppercase tracking-widest">Tips</p>
                        {[
                            "Be specific about deliverables — students deliver faster with clear scope.",
                            "Set a fair budget — low budgets attract fewer quality submissions.",
                            "Add a deadline even if flexible — it signals urgency.",
                        ].map((t) => (
                            <div key={t} className="flex gap-2 text-xs text-white/40 leading-relaxed">
                                <CheckCircle2 className="h-3.5 w-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
                                {t}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </MsmeDashboardLayout>
    );
}
