import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, ArrowLeft } from "lucide-react";
import MsmeDashboardLayout from "../layout/MsmeDashboardLayout";

export default function PostTask() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        budget: "",
        skill: "",
        deadline: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("msme_accessToken");
            if (!token) throw new Error("Please log in to post a task.");

            const res = await fetch(`${import.meta.env.VITE_API_URL || 'https://stepahead-9tra.onrender.com'}/api/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to post task.");

            navigate("/msme/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MsmeDashboardLayout>
            <div className="max-w-3xl mx-auto">
                {/* ── Header ── */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate("/msme/dashboard")}
                        className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        Back to Dashboard
                    </button>
                    <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-1">
                        Task Creation
                    </p>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        Post a new task
                    </h1>
                </div>

                {/* ── Form ── */}
                <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                Task Title
                            </label>
                            <input
                                name="title"
                                type="text"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Build a landing page in React"
                                className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-purple-500/40 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                required
                                rows={5}
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the task, deliverables, and any specific requirements..."
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-purple-500/40 transition-all resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Budget (₹)
                                </label>
                                <input
                                    name="budget"
                                    type="number"
                                    required
                                    min="0"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    placeholder="e.g. 5000"
                                    className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-purple-500/40 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Required Skill
                                </label>
                                <div className="relative">
                                    <select
                                        name="skill"
                                        required
                                        value={formData.skill}
                                        onChange={handleChange}
                                        className="w-full h-12 px-4 pr-10 appearance-none bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/40 transition-all cursor-pointer"
                                    >
                                        <option value="" disabled className="bg-[#0e0e0e] text-white/40">Select a skill</option>
                                        <option value="Web Development" className="bg-[#0e0e0e] text-white">Web Development</option>
                                        <option value="App Development" className="bg-[#0e0e0e] text-white">App Development</option>
                                        <option value="Social Media Manager" className="bg-[#0e0e0e] text-white">Social Media Manager</option>
                                        <option value="Marketing" className="bg-[#0e0e0e] text-white">Marketing</option>
                                        <option value="Video Editing" className="bg-[#0e0e0e] text-white">Video Editing</option>
                                        <option value="SEO Optimizer" className="bg-[#0e0e0e] text-white">SEO Optimizer</option>
                                        <option value="Growth Strategist" className="bg-[#0e0e0e] text-white">Growth Strategist</option>
                                        <option value="UI/UX Design" className="bg-[#0e0e0e] text-white">UI/UX Design</option>
                                        <option value="Data Science" className="bg-[#0e0e0e] text-white">Data Science</option>
                                        <option value="Backend Engineering" className="bg-[#0e0e0e] text-white">Backend Engineering</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                Deadline <span className="text-white/30 font-normal">(Optional)</span>
                            </label>
                            <input
                                name="deadline"
                                type="date"
                                value={formData.deadline}
                                onChange={handleChange}
                                className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/40 transition-all css-date-picker"
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-sm font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-purple-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Plus className="h-4 w-4" />
                                )}
                                {loading ? "Posting..." : "Post Task"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
            <style>{`
                /* Simple fix for dark mode date picker icon in some browsers */
                ::-webkit-calendar-picker-indicator {
                    filter: invert(1);
                    opacity: 0.5;
                    cursor: pointer;
                }
                ::-webkit-calendar-picker-indicator:hover {
                    opacity: 0.8;
                }
            `}</style>
        </MsmeDashboardLayout>
    );
}
