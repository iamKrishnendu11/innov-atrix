import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle2,
    XCircle,
    ExternalLink,
    IndianRupee,
    UserCircle,
    Trophy,
    AlertCircle,
    ListChecks
} from "lucide-react";
import MsmeDashboardLayout from "../layout/MsmeDashboardLayout";
import EmptyState from "../ui-custom/EmptyState";

// ── Applications Page ───────────────────────────────────────────────────────
export default function MsmeApplications() {
    const [tasks, setTasks] = useState([]);
    const [applicationsMap, setApplicationsMap] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("msme_accessToken");
                const [rTasks, rSubs] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_URL || 'https://stepahead-9tra.onrender.com'}/api/tasks/my`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    fetch(`${import.meta.env.VITE_API_URL || 'https://stepahead-9tra.onrender.com'}/api/applications/msme`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);
                const dataTasks = await rTasks.json();
                const dataSubs = await rSubs.json();

                const subMap = {};
                if (dataSubs.applications) {
                    dataSubs.applications.forEach(sub => {
                        const taskIdStr = sub.task._id ? sub.task._id.toString() : sub.task.toString();
                        if (!subMap[taskIdStr]) subMap[taskIdStr] = [];
                        subMap[taskIdStr].push(sub);
                    });
                }
                
                // Only display tasks that actually have applications to review
                const activeTasks = (dataTasks.tasks || []).filter(b => subMap[b._id] && subMap[b._id].length > 0);
                
                setTasks(activeTasks);
                setApplicationsMap(subMap);
            } catch (error) {
                console.error("Failed to load data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleAccept = async (taskId, submissionId) => {
        try {
            const token = localStorage.getItem("msme_accessToken");
            await fetch(`${import.meta.env.VITE_API_URL || 'https://stepahead-9tra.onrender.com'}/api/applications/${submissionId}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ status: "accepted" })
            });

            setApplicationsMap((prev) => {
                const list = prev[taskId] || [];
                return {
                    ...prev,
                    [taskId]: list.map((s) =>
                        s._id === submissionId ? { ...s, status: "accepted" } : { ...s, status: "declined" }
                    ),
                };
            });
        } catch (err) { console.error(err); }
    };

    const handleDecline = async (taskId, submissionId) => {
        try {
            const token = localStorage.getItem("msme_accessToken");
            await fetch(`${import.meta.env.VITE_API_URL || 'https://stepahead-9tra.onrender.com'}/api/applications/${submissionId}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ status: "declined" })
            });

            setApplicationsMap((prev) => {
                const list = prev[taskId] || [];
                return {
                    ...prev,
                    [taskId]: list.map((s) =>
                        s._id === submissionId ? { ...s, status: "declined" } : s
                    ),
                };
            });
        } catch (err) { console.error(err); }
    };

    return (
        <MsmeDashboardLayout>
            <div className="mb-8">
                <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-1">
                    Review Work
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Applications
                </h1>
                <p className="text-sm text-white/35 mt-1">
                    Review student applications one by one. Accept a submission to credit the student and close the task.
                </p>
            </div>

            <div className="space-y-8">
                {tasks.length === 0 ? (
                    <div className="p-8 border border-white/5 bg-white/[0.02] rounded-2xl">
                        <EmptyState 
                            icon={ListChecks} 
                            title="No applications yet" 
                            description="When students submit work for your tasks, they will appear here for review."
                        />
                    </div>
                ) : loading ? (
                    <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" /></div>
                ) : (
                    tasks.map((task) => {
                        const list = applicationsMap[task._id] || [];
                        const accepted = list.find((s) => s.status === "accepted");
                        const active = list.find((s) => s.status === "pending");

                        return (
                            <div key={task._id} className="rounded-2xl bg-white/[0.015] border border-white/5 overflow-hidden">
                                {/* Task Header */}
                                <div className="p-5 sm:p-6 border-b border-white/5 bg-white/[0.01] flex flex-col justify-between sm:flex-row sm:items-center gap-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-white truncate">{task.title}</h3>
                                        <div className="flex items-center gap-2 mt-1.5 text-xs text-white/40 font-medium">
                                            <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md border border-emerald-400/20">
                                                <IndianRupee className="w-3" />
                                                <span>{task.budget.toLocaleString("en-IN")} Budget</span>
                                            </div>
                                            <span>
                                                • {list.filter(s => s.status !== "declined").length} submission(s)
                                            </span>
                                        </div>
                                    </div>
                                    {accepted && (
                                        <div className="flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 shadow-[0_0_15px_rgba(52,211,153,0.1)]">
                                            <Trophy className="w-3.5 h-3.5" />
                                            Task Closed
                                        </div>
                                    )}
                                </div>

                                {/* Content area */}
                                <div className="p-5 sm:p-6">
                                    <AnimatePresence mode="popLayout">
                                        {/* State 1: Accepted */}
                                        {accepted ? (
                                            <motion.div
                                                key="accepted"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 flex items-start sm:items-center gap-4"
                                            >
                                                <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex flex-shrink-0 items-center justify-center">
                                                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                                                </div>
                                                <div>
                                                    <p className="text-emerald-400 font-semibold text-sm sm:text-base">
                                                        Work accepted from {accepted.studentName}
                                                    </p>
                                                    <p className="text-emerald-400/70 text-xs sm:text-sm mt-1">
                                                        ₹{task.budget.toLocaleString("en-IN")} has been credited to their account. All other applications have been archived.
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ) : active ? (
                                            /* State 2: Active Submission Queue */
                                            <motion.div
                                                key={`active-${active.id}`}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.25 }}
                                            >
                                                <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5 sm:p-6">
                                                    {/* Student Info */}
                                                    <div className="flex items-center justify-between mb-5 pb-5 border-b border-white/5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-purple-500/20">
                                                                {active.studentName[0]}
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-white text-sm">{active.studentName}</p>
                                                                <p className="text-xs text-white/40">{active.studentUsername}</p>
                                                            </div>
                                                        </div>
                                                        {active.trustScore !== undefined && (
                                                            <div className={`flex flex-col items-end`}>
                                                                <div className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold ${
                                                                    active.trustScore >= 75 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                                    active.trustScore >= 50 ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                                    'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                                                }`}>
                                                                    <span>Trust Score</span>
                                                                    <span className="text-sm">{active.trustScore}%</span>
                                                                </div>
                                                                <p className="text-[10px] text-white/30 mt-1 uppercase tracking-widest">Algorithm Verified</p>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Notes and Images */}
                                                    <div className="mb-6">
                                                        <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-2 flex items-center gap-1.5">
                                                            <AlertCircle className="w-3.5 h-3.5" /> Note from student
                                                        </p>
                                                        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                                            <p className="text-sm text-white/70 leading-relaxed">
                                                                {active.notes || "No additional notes provided."}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="flex items-center justify-end gap-3 pt-2">
                                                        <button
                                                            onClick={() => handleDecline(task._id, active._id)}
                                                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                            Decline
                                                        </button>
                                                        <button
                                                            onClick={() => handleAccept(task._id, active._id)}
                                                            className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 shadow-lg shadow-emerald-500/25 transition-all outline-none md:hover:scale-105 active:scale-95"
                                                        >
                                                            <CheckCircle2 className="w-4 h-4" />
                                                            Accept & Pay ₹{task.budget.toLocaleString("en-IN")}
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            /* State 3: No more applications */
                                            <motion.div
                                                key="empty"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="py-10 text-center flex flex-col items-center justify-center"
                                            >
                                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                                                    <UserCircle className="w-6 h-6 text-white/20" />
                                                </div>
                                                <p className="text-white/60 font-medium text-sm">No pending applications left.</p>
                                                <p className="text-white/30 text-xs mt-1">Wait for more students to submit their work.</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </MsmeDashboardLayout>
    );
}
