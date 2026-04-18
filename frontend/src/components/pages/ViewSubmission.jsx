import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    ExternalLink,
    IndianRupee,
    Calendar,
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
    User,
    Trophy,
    FileText,
    Image as ImageIcon,
    Link2,
} from "lucide-react";
import { format } from "date-fns";
import MsmeDashboardLayout from "../layout/MsmeDashboardLayout";

// ── Status Badge ───────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
    const map = {
        pending:  { label: "Pending Review", cls: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
        accepted: { label: "Accepted",        cls: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
        declined: { label: "Declined",        cls: "text-red-400 bg-red-400/10 border-red-400/20" },
    };
    const s = map[status] || map.pending;
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${s.cls}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {s.label}
        </span>
    );
}

// ── Avatar ────────────────────────────────────────────────────────────────────
function Avatar({ name, size = "w-14 h-14", textSize = "text-xl" }) {
    const initials = (name || "S").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    return (
        <div className={`${size} rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold ${textSize} flex-shrink-0 shadow-lg shadow-purple-500/20`}>
            {initials}
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ViewSubmission() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [submission, setSubmission] = useState(null);
    const [loading, setLoading]       = useState(true);
    const [error, setError]           = useState("");
    const [actionLoading, setActionLoading] = useState(false);
    const [lightbox, setLightbox]     = useState(null); // image URL for lightbox

    useEffect(() => {
        const fetchSubmission = async () => {
            const token = localStorage.getItem("msme_accessToken");
            try {
                const res = await fetch(`http://localhost:5000/api/submissions/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Failed to load submission");
                setSubmission(data.submission);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSubmission();
    }, [id]);

    const handleStatus = async (status) => {
        if (actionLoading) return;
        setActionLoading(true);
        try {
            const token = localStorage.getItem("msme_accessToken");
            const res = await fetch(`http://localhost:5000/api/submissions/${id}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed");
            setSubmission((prev) => ({ ...prev, status }));
        } catch (err) {
            alert(err.message);
        } finally {
            setActionLoading(false);
        }
    };

    // ── Loading ──
    if (loading) {
        return (
            <MsmeDashboardLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                </div>
            </MsmeDashboardLayout>
        );
    }

    // ── Error ──
    if (error || !submission) {
        return (
            <MsmeDashboardLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                        <AlertCircle className="w-7 h-7 text-red-400" />
                    </div>
                    <p className="text-white font-semibold text-lg mb-1">{error || "Submission not found"}</p>
                    <p className="text-white/40 text-sm mb-6">This submission may have been removed or you don't have access.</p>
                    <Link
                        to="/msme/submissions"
                        className="flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Submissions
                    </Link>
                </div>
            </MsmeDashboardLayout>
        );
    }

    const bounty    = submission.bounty || {};
    const deadline  = bounty.deadline ? new Date(bounty.deadline) : null;
    const submitted = submission.createdAt ? new Date(submission.createdAt) : null;
    const isPending = submission.status === "pending";

    return (
        <MsmeDashboardLayout>
            {/* ── Lightbox ── */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightbox(null)}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
                    >
                        <motion.img
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            src={lightbox}
                            alt="Preview"
                            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button
                            onClick={() => setLightbox(null)}
                            className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors text-sm font-medium"
                        >
                            ✕ Close
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-4xl mx-auto">
                {/* ── Back nav ── */}
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-7"
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        Back to Submissions
                    </button>
                </motion.div>

                {/* ── Hero card ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-2xl bg-white/[0.03] border border-white/8 overflow-hidden mb-5"
                >
                    {/* Gradient banner */}
                    <div className="h-2 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600" />

                    <div className="p-6 sm:p-8">
                        {/* Top row: student + status */}
                        <div className="flex flex-col sm:flex-row sm:items-start gap-5 justify-between mb-6 pb-6 border-b border-white/5">
                            <div className="flex items-center gap-4">
                                <Avatar name={submission.studentName} />
                                <div>
                                    <p className="text-lg font-bold text-white">{submission.studentName}</p>
                                    <p className="text-sm text-white/40">{submission.studentUsername}</p>
                                    {submitted && (
                                        <p className="text-xs text-white/25 mt-1 flex items-center gap-1.5">
                                            <Clock className="w-3 h-3" />
                                            Submitted {format(submitted, "MMM d, yyyy · h:mm a")}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <StatusBadge status={submission.status} />
                        </div>

                        {/* Bounty meta */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                                <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-1 flex items-center gap-1.5">
                                    <FileText className="w-3.5 h-3.5" /> Bounty
                                </p>
                                <p className="text-sm font-semibold text-white leading-snug">{bounty.title || "—"}</p>
                            </div>
                            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                                <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-1 flex items-center gap-1.5">
                                    <IndianRupee className="w-3.5 h-3.5" /> Prize
                                </p>
                                <p className="text-xl font-black text-white">
                                    ₹{Number(bounty.budget || 0).toLocaleString("en-IN")}
                                </p>
                            </div>
                            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                                <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-1 flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" /> Deadline
                                </p>
                                <p className="text-sm font-semibold text-white">
                                    {deadline ? format(deadline, "MMM d, yyyy") : "—"}
                                </p>
                            </div>
                        </div>

                        {/* Work Link */}
                        <div className="mb-6">
                            <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-3 flex items-center gap-1.5">
                                <Link2 className="w-3.5 h-3.5" /> Submitted Work
                            </p>
                            <a
                                href={submission.workLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2.5 w-full sm:w-auto px-5 py-3 rounded-xl bg-purple-600/15 border border-purple-500/25 text-purple-300 font-semibold text-sm hover:bg-purple-600/25 hover:border-purple-500/40 transition-all"
                            >
                                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                <span className="truncate max-w-xs sm:max-w-sm">{submission.workLink}</span>
                            </a>
                        </div>

                        {/* Notes */}
                        <div className="mb-6">
                            <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-3 flex items-center gap-1.5">
                                <AlertCircle className="w-3.5 h-3.5" /> Note from Student
                            </p>
                            <div className="bg-black/20 border border-white/5 rounded-xl p-5">
                                <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">
                                    {submission.notes?.trim() || (
                                        <span className="text-white/30 italic">No additional notes provided.</span>
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Images */}
                        {submission.images && submission.images.length > 0 && (
                            <div className="mb-6">
                                <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-3 flex items-center gap-1.5">
                                    <ImageIcon className="w-3.5 h-3.5" /> Attachments ({submission.images.length})
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {submission.images.map((url, idx) => (
                                        <motion.button
                                            key={idx}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => setLightbox(url)}
                                            className="aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5 relative group"
                                        >
                                            <img
                                                src={url}
                                                alt={`attachment-${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="text-white text-xs font-semibold">View</span>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* ── Action Panel ── */}
                <AnimatePresence mode="wait">
                    {submission.status === "accepted" ? (
                        <motion.div
                            key="accepted"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-6 flex items-center gap-4"
                        >
                            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                <Trophy className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-emerald-400 font-bold text-base">Work Accepted!</p>
                                <p className="text-emerald-400/60 text-sm mt-0.5">
                                    ₹{Number(bounty.budget || 0).toLocaleString("en-IN")} has been credited to {submission.studentName}. The bounty is now closed.
                                </p>
                            </div>
                        </motion.div>
                    ) : submission.status === "declined" ? (
                        <motion.div
                            key="declined"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 flex items-center gap-4"
                        >
                            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                                <XCircle className="w-6 h-6 text-red-400" />
                            </div>
                            <div>
                                <p className="text-red-400 font-bold text-base">Submission Declined</p>
                                <p className="text-red-400/60 text-sm mt-0.5">
                                    This submission has been declined. Other pending submissions for this bounty remain open.
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="actions"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-2xl bg-white/[0.03] border border-white/8 p-6"
                        >
                            <p className="text-sm font-semibold text-white mb-1">Make a Decision</p>
                            <p className="text-xs text-white/40 mb-5">
                                Accepting will close the bounty and credit ₹{Number(bounty.budget || 0).toLocaleString("en-IN")} to {submission.studentName}.
                                Declining will move to the next submission.
                            </p>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                <button
                                    onClick={() => handleStatus("declined")}
                                    disabled={actionLoading}
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white/50 hover:text-red-400 hover:bg-red-500/10 border border-white/8 hover:border-red-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <XCircle className="w-4 h-4" />
                                    Decline
                                </button>
                                <button
                                    onClick={() => handleStatus("accepted")}
                                    disabled={actionLoading}
                                    className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed outline-none hover:scale-105 active:scale-95"
                                >
                                    {actionLoading ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <CheckCircle2 className="w-4 h-4" />
                                    )}
                                    Accept & Pay ₹{Number(bounty.budget || 0).toLocaleString("en-IN")}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </MsmeDashboardLayout>
    );
}
