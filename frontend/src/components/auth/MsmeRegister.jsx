import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const BUSINESS_TYPES = [
    "Technology & Software",
    "Manufacturing",
    "Retail & E-Commerce",
    "Healthcare & Wellness",
    "Education & Training",
    "Finance & Consulting",
    "Food & Beverage",
    "Agriculture",
    "Construction & Real Estate",
    "Creative & Media",
    "Logistics & Supply Chain",
    "Other",
];

const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-500/60 focus:bg-white/8 transition-all duration-200";

const labelClass = "block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-widest";

export default function MsmeRegister() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        businessName: "",
        email: "",
        businessType: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            return setError("Passwords do not match.");
        }
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'https://stepahead-9tra.onrender.com'}/api/msme/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    businessName: form.businessName,
                    email: form.email,
                    businessType: form.businessType,
                    password: form.password,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Registration failed");
            navigate("/msme/login");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#0a0a0f] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-pink-600/10 blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md relative z-10"
            >
                {/* Card */}
                <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <Link to="/" className="inline-block mb-6">
                            <span className="text-sm font-semibold text-white/40 tracking-widest uppercase hover:text-white/70 transition-colors">
                                ← Back to Home
                            </span>
                        </Link>
                        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1 mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                            <span className="text-xs text-purple-300 font-medium tracking-wide">For Businesses</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Create MSME Account</h1>
                        <p className="text-sm text-white/40">Connect with verified student talent today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Business Name */}
                        <div>
                            <label className={labelClass}>Business Name</label>
                            <input
                                id="reg-businessName"
                                name="businessName"
                                type="text"
                                placeholder="Acme Pvt. Ltd."
                                value={form.businessName}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className={labelClass}>Business Email</label>
                            <input
                                id="reg-email"
                                name="email"
                                type="email"
                                placeholder="contact@yourbusiness.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            />
                        </div>

                        {/* Business Type */}
                        <div>
                            <label className={labelClass}>Business Type</label>
                            <select
                                id="reg-businessType"
                                name="businessType"
                                value={form.businessType}
                                onChange={handleChange}
                                required
                                className={`${inputClass} cursor-pointer`}
                            >
                                <option value="" disabled className="bg-[#0a0a0f]">
                                    Select your industry
                                </option>
                                {BUSINESS_TYPES.map((type) => (
                                    <option key={type} value={type} className="bg-[#0a0a0f]">
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Password */}
                        <div>
                            <label className={labelClass}>Password</label>
                            <input
                                id="reg-password"
                                name="password"
                                type="password"
                                placeholder="Min. 8 characters"
                                value={form.password}
                                onChange={handleChange}
                                required
                                minLength={8}
                                className={inputClass}
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className={labelClass}>Confirm Password</label>
                            <input
                                id="reg-confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Re-enter password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            />
                        </div>

                        {/* Error */}
                        <AnimatePresence>
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2"
                                >
                                    {error}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        {/* Submit */}
                        <button
                            id="reg-submit"
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-purple-900/30 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer mt-2"
                        >
                            {loading ? "Creating Account…" : "Create Account"}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm text-white/30 mt-6">
                        Already have an account?{" "}
                        <Link
                            to="/msme/login"
                            className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
