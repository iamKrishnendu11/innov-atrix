import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-500/60 focus:bg-white/8 transition-all duration-200";

const labelClass = "block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-widest";

export default function MsmeLogin() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch("http://localhost:5000/api/msme/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Login failed");

            // Store access token for subsequent API calls
            localStorage.setItem("msme_accessToken", data.accessToken);
            localStorage.setItem("msme", JSON.stringify(data.msme));

            navigate("/msme/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#0a0a0f] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-pink-600/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <Link to="/" className="inline-block mb-6">
                            <span className="text-sm font-semibold text-white/40 tracking-widest uppercase hover:text-white/70 transition-colors">
                                ← Back to Home
                            </span>
                        </Link>
                        <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 rounded-full px-3 py-1 mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                            <span className="text-xs text-pink-300 font-medium tracking-wide">MSME Portal</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-sm text-white/40">Sign in to your business account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className={labelClass}>Business Email</label>
                            <input
                                id="login-email"
                                name="email"
                                type="email"
                                placeholder="contact@yourbusiness.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className={`${labelClass} mb-0`}>Password</label>
                                <span className="text-xs text-purple-400 cursor-pointer hover:text-purple-300 transition-colors">
                                    Forgot password?
                                </span>
                            </div>
                            <input
                                id="login-password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={form.password}
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
                            id="login-submit"
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-purple-900/30 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer mt-2"
                        >
                            {loading ? "Signing In…" : "Sign In"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-xs text-white/20">or</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {/* Register CTA */}
                    <p className="text-center text-sm text-white/30">
                        New to the platform?{" "}
                        <Link
                            to="/msme/register"
                            className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>

                {/* Trust badge */}
                <p className="text-center text-xs text-white/20 mt-6">
                    Trusted by <span className="text-white/40 font-medium">2,000+</span> businesses across India
                </p>
            </motion.div>
        </div>
    );
}
