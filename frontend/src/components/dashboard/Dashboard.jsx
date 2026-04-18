import React from "react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";

const Dashboard = () => {
    const trustScore = 89;
    const rating = 4.7;

    const data = [
        { name: "score", value: trustScore },
        { name: "rest", value: 100 - trustScore },
    ];

    const getColor = () => {
        if (trustScore > 80) return "#22c55e";
        if (trustScore > 50) return "#f59e0b";
        return "#ef4444";
    };
    return (
        <div>
            <meta charSet="utf-8" />
            <meta content="width=device-width, initial-scale=1.0" name="viewport" />
            <title>SkillBridge - Profile</title>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            <style dangerouslySetInnerHTML={{ __html: "\n        body { font-family: 'Inter', sans-serif; }\n        .nebula-shadow { box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 15px rgba(186, 158, 255, 0.05); }\n        .glass-panel { backdrop-filter: blur(20px); background-color: rgba(38, 38, 38, 0.4); }\n        .ghost-border { border: 1px solid rgba(73, 72, 71, 0.15); }\n        .card-gradient { background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%); }\n    " }} />
            {/* Top Navigation (Mobile) */}
            <nav className="md:hidden w-full h-16 fixed top-0 z-50 bg-[#0e0e0e]/80 backdrop-blur-lg flex items-center justify-between px-6 shadow-xl border-b border-outline-variant/10">
                <div className="text-2xl font-black bg-gradient-to-br from-[#ba9eff] to-[#699cff] bg-clip-text text-transparent tracking-tighter">Step-A-Ahead</div>
                <button className="text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 0' }}>menu</span>
                </button>
            </nav>
            {/* Side Navigation (Web) */}
            <nav className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 border-r border-white/5 bg-neutral-900/40 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_15px_rgba(186,158,255,0.05)] z-40 transition-all">
                <div className="p-8">
                    <div className="text-2xl font-extrabold tracking-tighter bg-gradient-to-r from-[#ba9eff] to-[#699cff] bg-clip-text text-transparent">Step-A-Ahead</div>
                    <div className="text-xs text-on-surface-variant tracking-wider uppercase mt-1 font-semibold opacity-70">Future of Work</div>
                </div>
                <div className="flex-1 px-4 space-y-2 mt-4">
                    <Link to="/" className="flex items-center gap-4 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-300 group">
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform duration-200" style={{ fontVariationSettings: '"FILL" 0' }}>home</span>
                        <span className="font-medium tracking-wide text-sm">Home</span>
                    </Link>
                    <Link to="/bounties" className="flex items-center gap-4 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-300 group">
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform duration-200" style={{ fontVariationSettings: '"FILL" 0' }}>rebase_edit</span>
                        <span className="font-medium tracking-wide text-sm">Bounties</span>
                    </Link>
                    <Link to="/bounties" className="flex items-center gap-4 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-300 group">
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform duration-200" style={{ fontVariationSettings: '"FILL" 0' }}>folder_open</span>
                        <span className="font-medium tracking-wide text-sm">Projects</span>
                    </Link>
                    <Link to="/dashboard" className="flex items-center gap-4 px-4 py-3 rounded-xl text-[#ba9eff] border-r-2 border-[#ba9eff] font-bold bg-white/5 transition-all duration-300 group">
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform duration-200" style={{ fontVariationSettings: '"FILL" 1' }}>person</span>
                        <span className="font-medium tracking-wide text-sm">Profile</span>
                    </Link>
                </div>
                <div className="p-6 border-t border-white/5">
                    <div className="flex items-center gap-3">
                        <img alt="User Avatar" className="w-10 h-10 rounded-full border border-primary/20 object-cover" data-alt="close up portrait of a young professional woman with warm ambient lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1lOPj05CQDq-gZkOlVLaN4Rt-x5Y9907-RMvFHtfrFlJbE6Pwji_VLT13vUx0Y_kdsCpjgF2fAQrKnvHYvZyTYsXAFLSGf4zA6WSO6hMsC6F-b2TTAn2_jsztGF7bgev45dbOZQ0Z6HIN6rWIyEx_uBCyjTNFuubo-hqWgj7YOwd6e7x_3RzyiptdJ09J8X2t4cmjTwkLkwHEMmnHtRSMahHpwuYFJnaDOdLfgvnTfRr-X6wKPw75hTBl7m6_AmJlxiXjqhmbwQ8" />
                        <div>
                            <div className="text-sm font-semibold text-on-surface">Alex Mercer</div>
                            <div className="text-xs text-on-surface-variant">alex@skillbridge.io</div>
                        </div>
                    </div>
                </div>
            </nav>
            {/* Main Content Area */}
            <main className="pt-10 pb-24 md:pt-10 md:pl-64 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <header className="relative bg-surface-container-low rounded-3xl p-8 md:p-12 mb-8 overflow-hidden nebula-shadow border border-outline-variant/10">
                        {/* Background Decorative Gradient */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-8">
                            {/* Avatar */}
                            <div className="relative group">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-primary/30 p-1 backdrop-blur-sm relative z-10">
                                    <img alt="Profile Picture" className="w-full h-full rounded-full object-cover" data-alt="professional portrait of a young male developer with glasses in a modern studio setting dark background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrxuMnLBfY4Pc8VTb4Op0KaAIKMW-K51GHm196ajva4CEMy28wo5dwpSNgbksl_Br5cvcYtaTcB_aZGTKIttv0ebC18s3KbYFJisDimUJZ89pZbtMs0s4C7eOk06_Y3ayzl-Yj4aa2RrIvwCKuEZ2tuYpB2ers3wERWfGEX-uLPJAyxv4UXJ4Hgtpd3OTDE485eoqdRs0DmQnD5q7YBToiKtZ52ODVHRhJ2XJS2DjHj1yabHJ1fltKqF4vk1-QZJ62anx6u4V_Whg" />
                                </div>
                                {/* Trust Badge */}
                                <div className="absolute -bottom-2 -right-2 bg-surface-container-highest rounded-full p-2 border border-outline-variant/20 shadow-lg z-20 flex items-center justify-center" title="Elite Trust Score">
                                    <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>verified</span>
                                </div>
                                {/* Halo effect */}
                                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl group-hover:bg-primary/30 transition-colors duration-500 z-0" />
                            </div>
                            {/* Info */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="inline-flex items-center gap-2 mb-2">
                                    <span className="px-3 py-1 bg-tertiary-container/20 text-tertiary text-[10px] uppercase tracking-widest font-bold rounded-full border border-tertiary/20 backdrop-blur-md">Top 1% Contributor</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-2">David Chen</h1>
                                {/* <p className="text-lg text-on-surface-variant font-medium mb-4 flex items-center justify-center md:justify-start gap-2">
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 0' }}>terminal</span> Full Stack Architect
                                    </p>
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                        <button className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(186,158,255,0.3)] transition-all duration-300 text-sm">
                                            Hire for Project
                                        </button>
                                        <button className="px-6 py-2.5 bg-surface-container-highest border border-outline-variant/15 text-on-surface font-semibold rounded-lg hover:bg-surface-bright transition-colors text-sm">
                                            Send Message
                                        </button>
                                    </div> */}
                            </div>
                            {/* Stats Quick View */}
                            <div className="flex gap-6 mt-6 md:mt-0 glass-panel p-6 rounded-2xl border border-outline-variant/10">
                                <div className="text-center">
                                    <div className="text-3xl font-black text-on-surface tracking-tighter">42</div>
                                    <div className="text-xs text-on-surface-variant uppercase tracking-widest mt-1">Bounties</div>
                                </div>
                                <div className="w-px bg-outline-variant/20" />
                                <div className="text-center">
                                    <div className="text-3xl font-black text-on-surface tracking-tighter">98<span className="text-lg text-primary">%</span></div>
                                    <div className="text-xs text-on-surface-variant uppercase tracking-widest mt-1">Success</div>
                                </div>
                            </div>
                        </div>
                    </header>
                    {/* Bento Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Left Column (Wider) */}
                        <div className="lg:col-span-8 space-y-6">
                            {/* GitHub Integration Section */}
                            <section className="bg-surface-container rounded-2xl p-6 md:p-8 ghost-border card-gradient relative overflow-hidden group">
                                <div className="absolute top-0 right-0 opacity-5 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
                                    <svg fill="currentColor" height={200} viewBox="0 0 24 24" width={200} xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                                </div>
                                <div className="flex items-center justify-between mb-6 relative z-10">
                                    <h2 className="text-xl font-bold text-on-surface flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 0' }}>code_blocks</span>
                                        Connected Activity
                                    </h2>
                                    <span className="text-xs font-semibold text-secondary px-3 py-1 bg-secondary/10 rounded-full border border-secondary/20">Syncing Live</span>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 relative z-10">
                                    <div className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant/10 hover:border-primary/30 transition-colors">
                                        <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Task Completed</div>
                                        <div className="text-2xl font-bold text-on-surface">1,429</div>
                                    </div>
                                    <div className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant/10 hover:border-primary/30 transition-colors">
                                        <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Task Earnings</div>
                                        <div className="text-2xl font-bold text-on-surface">342</div>
                                    </div>
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant/10 flex flex-col items-center"
                                    >
                                        <div className="text-xs uppercase text-white mb-2">Trust Score</div>

                                        <div className="relative">
                                            <PieChart width={100} height={100}>
                                                <Pie
                                                    data={data}
                                                    innerRadius={30}
                                                    outerRadius={45}
                                                    startAngle={90}
                                                    endAngle={-270}
                                                    dataKey="value"
                                                >
                                                    <Cell fill={getColor()} />
                                                    <Cell fill="#111111" />
                                                </Pie>
                                            </PieChart>

                                            <div className="absolute inset-0 flex items-center justify-center font-bold text-white">
                                                {trustScore}%
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* RATING */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant/10 flex flex-col items-center"
                                    >
                                        <div className="text-xs uppercase mb-2 text-white">Rating</div>

                                        <div className="flex text-tertiary">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <span key={i} className="material-symbols-outlined">
                                                    {rating >= i ? "star" : rating >= i - 0.5 ? "star_half" : "star_border"}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="text-sm mt-1 text-white">{rating}</div>
                                    </motion.div>
                                </div>


                            </section>
                            {/* Completed Projects (Grid Cards) */}
                            <section className="bg-surface-container-low rounded-2xl p-6 md:p-8 ghost-border">
                                <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-3">
                                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: '"FILL" 0' }}>rocket_launch</span>
                                    Recent Missions
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Project Card 1 */}
                                    <div className="bg-surface-container rounded-xl p-5 border border-outline-variant/10 hover:bg-surface-bright transition-colors group cursor-pointer">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 0' }}>data_object</span>
                                            </div>
                                            <span className="text-xs font-medium text-on-surface-variant bg-surface-container-lowest px-2 py-1 rounded-md">DeFi</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">Nexus Protocol V2</h3>
                                        <p className="text-sm text-on-surface-variant mb-4 line-clamp-2">Smart contract optimization and frontend integration for a decentralized lending platform.</p>
                                        <div className="flex items-center justify-between border-t border-outline-variant/10 pt-4 mt-auto">
                                            <div className="flex -space-x-2">
                                                <div className="w-6 h-6 rounded-full bg-surface-container-lowest border border-outline-variant/20 flex items-center justify-center text-[10px] font-bold text-on-surface z-10">TS</div>
                                                <div className="w-6 h-6 rounded-full bg-surface-container-lowest border border-outline-variant/20 flex items-center justify-center text-[10px] font-bold text-on-surface z-0">Sol</div>
                                            </div>
                                            <span className="text-xs font-semibold text-tertiary">Completed</span>
                                        </div>
                                    </div>
                                    {/* Project Card 2 */}
                                    <div className="bg-surface-container rounded-xl p-5 border border-outline-variant/10 hover:bg-surface-bright transition-colors group cursor-pointer">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-2 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors">
                                                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: '"FILL" 0' }}>api</span>
                                            </div>
                                            <span className="text-xs font-medium text-on-surface-variant bg-surface-container-lowest px-2 py-1 rounded-md">Tooling</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-on-surface mb-2 group-hover:text-secondary transition-colors">Omni Graph API</h3>
                                        <p className="text-sm text-on-surface-variant mb-4 line-clamp-2">Built a unified GraphQL gateway aggregating 5 microservices with zero downtime.</p>
                                        <div className="flex items-center justify-between border-t border-outline-variant/10 pt-4 mt-auto">
                                            <div className="flex -space-x-2">
                                                <div className="w-6 h-6 rounded-full bg-surface-container-lowest border border-outline-variant/20 flex items-center justify-center text-[10px] font-bold text-on-surface z-20">Go</div>
                                                <div className="w-6 h-6 rounded-full bg-surface-container-lowest border border-outline-variant/20 flex items-center justify-center text-[10px] font-bold text-on-surface z-10">GQL</div>
                                            </div>
                                            <span className="text-xs font-semibold text-tertiary">Completed</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <motion.section
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-surface-container-low rounded-2xl p-6 ghost-border"
                            >
                                <h1 className="text-2xl font-bold mb-3">About Me</h1>
                                <p className="text-sm text-on-surface-variant">
                                    Passionate full-stack developer focused on scalable apps and Web3 systems.
                                    Strong in React, backend, and UI architecture.
                                </p>
                            </motion.section>

                            {/* EXPERIENCE */}
                            <motion.section
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-surface-container-low rounded-2xl p-6 ghost-border"
                            >
                                <h1 className="text-2xl font-bold mb-3">Past Experience</h1>
                                <p className="text-sm text-on-surface-variant">
                                    Passionate full-stack developer focused on scalable apps and Web3 systems.
                                    Strong in React, backend, and UI architecture.
                                </p>
                            </motion.section>1

                        </div>
                        {/* Right Column (Narrower) */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Portfolio Links */}
                            <section className="bg-surface-container-low rounded-2xl p-6 ghost-border">
                                <h2 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-4">Ecosystem Links</h2>
                                <ul className="space-y-3">
                                    <li>
                                        <a className="flex items-center gap-3 p-3 rounded-lg bg-surface-container hover:bg-surface-container-highest border border-transparent hover:border-outline-variant/20 transition-all group" href="#">
                                            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors" style={{ fontVariationSettings: '"FILL" 0' }}>language</span>
                                            <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">davidchen.dev</span>
                                            <span className="material-symbols-outlined text-sm ml-auto text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontVariationSettings: '"FILL" 0' }}>arrow_outward</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="flex items-center gap-3 p-3 rounded-lg bg-surface-container hover:bg-surface-container-highest border border-transparent hover:border-outline-variant/20 transition-all group" href="#">
                                            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-[#1DA1F2] transition-colors" style={{ fontVariationSettings: '"FILL" 0' }}>flutter_dash</span>
                                            <span className="text-sm font-medium text-on-surface group-hover:text-white transition-colors">@dchen_builds</span>
                                            <span className="material-symbols-outlined text-sm ml-auto text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontVariationSettings: '"FILL" 0' }}>arrow_outward</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="flex items-center gap-3 p-3 rounded-lg bg-surface-container hover:bg-surface-container-highest border border-transparent hover:border-outline-variant/20 transition-all group" href="#">
                                            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-[#0077b5] transition-colors" style={{ fontVariationSettings: '"FILL" 0' }}>work</span>
                                            <span className="text-sm font-medium text-on-surface group-hover:text-white transition-colors">LinkedIn Profile</span>
                                            <span className="material-symbols-outlined text-sm ml-auto text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontVariationSettings: '"FILL" 0' }}>arrow_outward</span>
                                        </a>
                                    </li>
                                </ul>
                            </section>
                            {/* Skills Matrix */}
                            <section className="bg-surface-container-low rounded-2xl p-6 ghost-border card-gradient">
                                <h2 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-6">Combat Matrix</h2>
                                <div className="space-y-5">
                                    {/* Skill 1 */}
                                    <div>
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-sm font-semibold text-on-surface">React / Next.js</span>
                                            <span className="text-xs text-primary font-bold">95%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-surface-container-lowest rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full shadow-[0_0_10px_rgba(186,158,255,0.5)]" style={{ width: '95%' }} />
                                        </div>
                                    </div>
                                    {/* Skill 2 */}
                                    <div>
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-sm font-semibold text-on-surface">TypeScript</span>
                                            <span className="text-xs text-secondary font-bold">88%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-surface-container-lowest rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-secondary to-secondary-dim rounded-full shadow-[0_0_10px_rgba(105,156,255,0.5)]" style={{ width: '88%' }} />
                                        </div>
                                    </div>
                                    {/* Skill 3 */}
                                    <div>
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-sm font-semibold text-on-surface">Solidity</span>
                                            <span className="text-xs text-tertiary font-bold">75%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-surface-container-lowest rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-tertiary to-tertiary-dim rounded-full shadow-[0_0_10px_rgba(255,151,181,0.5)]" style={{ width: '75%' }} />
                                        </div>
                                    </div>
                                    {/* Skill 4 */}
                                    <div>
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-sm font-semibold text-on-surface">UI/UX Architecture</span>
                                            <span className="text-xs text-primary-dim font-bold">82%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-surface-container-lowest rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-primary-dim to-inverse-primary rounded-full shadow-[0_0_10px_rgba(132,85,239,0.5)]" style={{ width: '82%' }} />
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/* Reviews (Minimal Glass) */}
                            <section className="glass-panel rounded-2xl p-6 ghost-border relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/10 rounded-full blur-[40px] pointer-events-none" />
                                <h2 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-4 relative z-10">Intel</h2>
                                <div className="space-y-4 relative z-10">
                                    {/* Review Item */}
                                    <div className="p-4 bg-surface-container/50 rounded-xl border border-outline-variant/10 hover:bg-surface-container transition-colors">
                                        <div className="flex gap-1 mb-2">
                                            <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                            <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                            <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                            <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                            <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                        </div>
                                        <p className="text-sm text-on-surface italic mb-3">"David delivered the frontend architecture weeks ahead of schedule. Flawless execution and great communication."</p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-surface-bright flex items-center justify-center text-[10px] font-bold text-on-surface">EM</div>
                                            <span className="text-xs text-on-surface-variant">Elena M. • Nexus Defi</span>
                                        </div>
                                    </div>
                                    {/* Review Item */}
                                    <div className="p-4 bg-surface-container/50 rounded-xl border border-outline-variant/10 hover:bg-surface-container transition-colors">
                                        <div className="flex gap-1 mb-2">
                                            <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                            <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                            <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                            <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                            <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                        </div>
                                        <p className="text-sm text-on-surface italic mb-3">"Highly technical and understands the big picture. The graphQL setup was incredibly robust."</p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-surface-bright flex items-center justify-center text-[10px] font-bold text-on-surface">JT</div>
                                            <span className="text-xs text-on-surface-variant">James T. • Omni</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full mt-4 py-2 text-xs font-semibold text-primary hover:text-primary-container transition-colors flex items-center justify-center gap-1">
                                    View All 18 Reviews <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 0' }}>arrow_right_alt</span>
                                </button>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
            {/* Bottom Navigation (Mobile) */}
            <nav className="md:hidden fixed bottom-0 w-full h-16 bg-[#0e0e0e]/90 backdrop-blur-xl border-t border-outline-variant/10 flex justify-around items-center z-50 px-2 pb-safe">
                <Link to="/" className="flex flex-col items-center justify-center w-16 h-full text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: '"FILL" 0' }}>home</span>
                    <span className="text-[10px] font-medium">Home</span>
                </Link>
                <Link to="/bounties" className="flex flex-col items-center justify-center w-16 h-full text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: '"FILL" 0' }}>rebase_edit</span>
                    <span className="text-[10px] font-medium">Bounties</span>
                </Link>
                <Link to="/bounties" className="flex flex-col items-center justify-center w-16 h-full text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: '"FILL" 0' }}>folder_open</span>
                    <span className="text-[10px] font-medium">Projects</span>
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