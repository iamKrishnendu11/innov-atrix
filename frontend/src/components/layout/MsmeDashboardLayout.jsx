import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Plus,
    ListChecks,
    LogOut,
    Building2,
    ChevronRight,
    Menu,
    X,
} from "lucide-react";

const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/msme/dashboard" },
    { name: "Post a Task", icon: Plus, path: "/msme/post-task" },
    { name: "Submissions", icon: ListChecks, path: "/msme/submissions" },
];

export default function MsmeDashboardLayout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [msme, setMsme] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("msme");
        if (!stored) {
            navigate("/msme/login");
        } else {
            setMsme(JSON.parse(stored));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("msme");
        localStorage.removeItem("msme_accessToken");
        navigate("/msme/login");
    };

    if (!msme)
        return (
            <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white font-sans antialiased flex">
            {/* ── Sidebar ──────────────────────────── */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-40 w-64 flex flex-col
                    bg-[#0d0d14]/90 border-r border-white/5 backdrop-blur-xl
                    transition-transform duration-300
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                `}
            >
                {/* Logo */}
                <div className="p-7 pb-4">
                    <div className="text-xl font-extrabold tracking-tighter bg-gradient-to-r from-[#ba9eff] to-[#699cff] bg-clip-text text-transparent">
                        Innov Atrix
                    </div>
                    <div className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5 font-semibold">
                        MSME Portal
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-4 space-y-1 mt-2">
                    {navItems.map(({ name, icon: Icon, path }) => {
                        const active = location.pathname === path;
                        return (
                            <Link
                                key={name}
                                to={path}
                                onClick={() => setMobileOpen(false)}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm
                                    font-medium transition-all duration-200
                                    ${active
                                        ? "bg-purple-600/15 text-purple-300 border border-purple-500/20"
                                        : "text-white/40 hover:text-white hover:bg-white/5"
                                    }
                                `}
                            >
                                <Icon
                                    className={`h-4 w-4 flex-shrink-0 ${active ? "text-purple-400" : ""}`}
                                />
                                {name}
                                {active && (
                                    <ChevronRight className="h-3 w-3 ml-auto text-purple-400/60" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User card */}
                <div className="p-4 border-t border-white/5 m-4 rounded-xl bg-white/[0.03]">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                            <Building2 className="h-4 w-4 text-white" />
                        </div>
                        <div className="min-w-0">
                            <div className="text-sm font-semibold text-white truncate">
                                {msme.businessName}
                            </div>
                            <div className="text-xs text-white/30 truncate">{msme.email}</div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-xs text-white/30 hover:text-red-400 transition-colors px-1 py-1 rounded-lg hover:bg-red-500/5"
                    >
                        <LogOut className="h-3.5 w-3.5" />
                        Sign out
                    </button>
                </div>
            </aside>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* ── Main ──────────────────────────────── */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                {/* Mobile top bar */}
                <header className="md:hidden sticky top-0 z-20 h-14 bg-[#0d0d14]/90 backdrop-blur-lg border-b border-white/5 flex items-center justify-between px-4">
                    <div className="text-lg font-bold bg-gradient-to-r from-[#ba9eff] to-[#699cff] bg-clip-text text-transparent">
                        Innov Atrix
                    </div>
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="text-white/50 hover:text-white transition-colors"
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </header>

                <main className="flex-1 p-4 md:p-8 max-w-6xl w-full mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
