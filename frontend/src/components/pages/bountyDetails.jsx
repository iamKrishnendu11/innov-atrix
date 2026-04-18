var MyClass = React.createClass({
    render: function () {
        return (
            <div>
                <meta charSet="utf-8" />
                <meta content="width=device-width, initial-scale=1.0" name="viewport" />
                <title>SkillBridge - Bounty Detail</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
                <style dangerouslySetInnerHTML={{ __html: "\n        body { font-family: 'Inter', sans-serif; }\n    " }} />
                {/* TopNavBar */}
                <nav className="bg-[#0e0e0e]/80 backdrop-blur-lg w-full h-16 fixed top-0 z-50 shadow-xl border-b border-outline-variant/15 font-['Inter'] tracking-tight flex items-center justify-between px-8 mx-auto">
                    <div className="flex items-center gap-8">
                        <div className="text-2xl font-black bg-gradient-to-br from-[#ba9eff] to-[#699cff] bg-clip-text text-transparent">SkillBridge</div>
                        <div className="hidden md:flex items-center gap-6">
                            <a className="text-neutral-400 hover:text-[#ba9eff] transition-all font-semibold hover:shadow-[0_0_20px_rgba(186,158,255,0.2)]" href="#">Platform</a>
                            <a className="text-white font-semibold shadow-[0_0_20px_rgba(186,158,255,0.2)]" href="#">Ecosystem</a>
                            <a className="text-neutral-400 hover:text-[#ba9eff] transition-all font-semibold hover:shadow-[0_0_20px_rgba(186,158,255,0.2)]" href="#">Docs</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="relative hidden sm:block">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
                            <input className="bg-surface-container-lowest border border-outline-variant/15 rounded-full py-1.5 pl-9 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-dim transition-all w-64" placeholder="Search bounties..." type="text" />
                        </div>
                        <button className="bg-gradient-to-r from-[#ba9eff] to-[#699cff] text-on-primary-fixed font-semibold px-4 py-1.5 rounded-full text-sm hover:shadow-[0_0_20px_rgba(186,158,255,0.4)] transition-all">Get Started</button>
                        <img alt="User Profile" className="w-8 h-8 rounded-full border border-outline-variant/30 object-cover" data-alt="close-up portrait of a young professional man with a neutral expression, warm studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUTq9j5QpWL8nnoJRpKc6kJfCZ2lezsl4bNG7XzId3iLGUW0SyDr61d4FwkV3syfN_iiaGhiAdDAEForA4YISCRcI9J_w7jb3N2HV2wacKPa2FZbLgezPR9RTYe1LdYEerUczjGxe5igAjixUoIjgH1PoTz5SvIKM8mZWDigENSXCIB71zRwwhmZwulswZvfpb60D2ehpNY3KbQkwjCOvQOClHR9xyBymJabMDhJ0IzrT5S_GGIa7-smZ87Ss5dfcvFe67pWSq8wQ" />
                    </div>
                </nav>
                {/* SideNavBar */}
                <aside className="flex flex-col fixed left-0 top-0 h-full w-64 border-r border-white/5 bg-neutral-900/40 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_15px_rgba(186,158,255,0.05)] pt-20 pb-6 px-4 z-40 hidden lg:flex flex-col font-['Inter'] antialiased">
                    <div className="flex-1 space-y-2 mt-8">
                        <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white transition-colors hover:bg-white/10 duration-300 scale-95 hover:scale-100 ease-out group" href="#">
                            <span className="material-symbols-outlined group-hover:text-primary transition-colors">home</span>
                            <span className="font-medium text-sm">Home</span>
                        </a>
                        <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#ba9eff] border-r-2 border-[#ba9eff] font-bold bg-white/5 scale-95 duration-200 ease-out" href="#">
                            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>rebase_edit</span>
                            <span className="font-medium text-sm">Bounties</span>
                        </a>
                        <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white transition-colors hover:bg-white/10 duration-300 scale-95 hover:scale-100 ease-out group" href="#">
                            <span className="material-symbols-outlined group-hover:text-primary transition-colors">folder_open</span>
                            <span className="font-medium text-sm">Projects</span>
                        </a>
                        <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white transition-colors hover:bg-white/10 duration-300 scale-95 hover:scale-100 ease-out group" href="#">
                            <span className="material-symbols-outlined group-hover:text-primary transition-colors">person</span>
                            <span className="font-medium text-sm">Profile</span>
                        </a>
                    </div>
                </aside>
                {/* Main Content */}
                <main className="pt-24 pb-12 px-6 lg:pl-72 max-w-screen-2xl mx-auto min-h-screen">
                    {/* Back Link */}
                    <a className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-6 text-sm" href="#">
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        Back to Bounties
                    </a>
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        {/* Left Column: Details */}
                        <div className="xl:col-span-2 space-y-8">
                            {/* Hero Header */}
                            <div className="bg-surface-container-low rounded-xl p-8 relative overflow-hidden border border-outline-variant/15">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
                                <div className="relative z-10 flex flex-col items-start gap-4">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-tertiary-container/20 text-tertiary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 border border-tertiary-container/30 shadow-[0_0_10px_rgba(255,151,181,0.15)]">
                                            <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
                                            Open Bounty
                                        </span>
                                        <span className="text-on-surface-variant text-sm flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                                            Ends in 4 days
                                        </span>
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
                                        Smart Contract Audit: Defi Yield Aggregator V2
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-6 mt-2 text-on-surface-variant">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary">payments</span>
                                            <span className="font-semibold text-primary-container text-lg">5,000 USDC</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="material-symbols-outlined text-[18px]">group</span>
                                            12 Applicants
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="material-symbols-outlined text-[18px]">military_tech</span>
                                            Advanced Difficulty
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Tabs & Content Area */}
                            <div className="bg-surface-container-low rounded-xl border border-outline-variant/15 overflow-hidden">
                                {/* Tab Navigation */}
                                <div className="flex border-b border-outline-variant/15 bg-surface-container-lowest/50 px-6 pt-4 gap-8">
                                    <button className="pb-3 border-b-2 border-primary text-primary font-semibold text-sm tracking-wide">
                                        Description
                                    </button>
                                    <button className="pb-3 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface transition-colors text-sm font-medium tracking-wide">
                                        Submissions (3)
                                    </button>
                                    <button className="pb-3 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface transition-colors text-sm font-medium tracking-wide flex items-center gap-2">
                                        Discussion
                                        <span className="bg-primary/20 text-primary text-[10px] px-1.5 py-0.5 rounded-full">New</span>
                                    </button>
                                </div>
                                {/* Tab Content: Description */}
                                <div className="p-8 space-y-8">
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold tracking-tight text-on-surface">Overview</h3>
                                        <p className="text-on-surface-variant text-base leading-relaxed">
                                            We are preparing to launch V2 of our decentralized yield aggregator. Before mainnet deployment, we require a comprehensive security audit of our core smart contracts. The protocol handles automated yield farming strategies across multiple AMMs and lending protocols on Ethereum and Arbitrum.
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold tracking-tight text-on-surface">Requirements</h3>
                                        <ul className="space-y-3 text-on-surface-variant text-base">
                                            <li className="flex items-start gap-3">
                                                <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">check_circle</span>
                                                Identify reentrancy vulnerabilities in the strategy routing logic.
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">check_circle</span>
                                                Verify flash loan attack resistance across all pricing oracles.
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">check_circle</span>
                                                Ensure correct gas optimization without compromising security.
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">check_circle</span>
                                                Provide a detailed written report with reproducible exploit scenarios.
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold tracking-tight text-on-surface">Required Skills</h3>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-3 py-1 bg-surface-container text-on-surface text-sm rounded border border-outline-variant/20 hover:border-primary/50 transition-colors cursor-default">Solidity</span>
                                            <span className="px-3 py-1 bg-surface-container text-on-surface text-sm rounded border border-outline-variant/20 hover:border-primary/50 transition-colors cursor-default">Security Audit</span>
                                            <span className="px-3 py-1 bg-surface-container text-on-surface text-sm rounded border border-outline-variant/20 hover:border-primary/50 transition-colors cursor-default">DeFi</span>
                                            <span className="px-3 py-1 bg-surface-container text-on-surface text-sm rounded border border-outline-variant/20 hover:border-primary/50 transition-colors cursor-default">Foundry</span>
                                            <span className="px-3 py-1 bg-surface-container text-on-surface text-sm rounded border border-outline-variant/20 hover:border-primary/50 transition-colors cursor-default">Vyper</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Right Column: Action & Employer */}
                        <div className="space-y-6">
                            {/* Action Card */}
                            <div className="bg-surface-container-high rounded-xl p-6 border border-outline-variant/15 shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_15px_rgba(186,158,255,0.05)] relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                                <div className="space-y-6 relative z-10">
                                    <div>
                                        <div className="text-sm text-on-surface-variant mb-1 uppercase tracking-wider font-semibold">Reward</div>
                                        <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">5,000 USDC</div>
                                        <div className="text-xs text-on-surface-variant mt-1 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">info</span>
                                            Escrowed in smart contract
                                        </div>
                                    </div>
                                    <button className="w-full bg-gradient-to-r from-primary to-secondary text-on-primary-fixed font-bold py-3.5 px-6 rounded-lg hover:shadow-[0_0_20px_rgba(186,158,255,0.3)] transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 group">
                                        Apply Now
                                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </button>
                                    <div className="flex items-center justify-center gap-4 text-sm text-on-surface-variant pt-2 border-t border-outline-variant/15">
                                        <button className="hover:text-primary transition-colors flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px]">bookmark_border</span> Save
                                        </button>
                                        <button className="hover:text-primary transition-colors flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px]">share</span> Share
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Employer Card */}
                            <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/15">
                                <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-4">Posted By</div>
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-lg bg-surface-container-highest border border-outline-variant/30 flex items-center justify-center overflow-hidden shrink-0">
                                        <img alt="Company Logo" className="w-full h-full object-cover opacity-80" data-alt="abstract geometric modern tech company logo on dark background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGqyVeTIy6rDDRPWjINdsmfpf_4ldZUrvESp5BV-2Uf23LSLeY_EOwcPK2iHIdPD1hkPmA4YlGNBLmpfgEJ789-B1Y3Xq4gBqaIpPCejMELLcgZA3-Kh5jlwu7VcE9olJFSt-cR5mAlYlF9KlLc2umYfvrGvxHdiG9Iaf15DcFXHMfJJRHm_WTAbuiSzmtJdaaAlEM8Sl5VmiT1gAkZUEHIECB_-4pJOkTpMYKnlZltibdgN-646_oXchXx9D9h4xKqOPMI9EzyPQ" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-on-surface flex items-center gap-2">
                                            Nexus Finance
                                            <span className="material-symbols-outlined text-secondary text-[16px]" title="Verified Protocol">verified</span>
                                        </h4>
                                        <p className="text-sm text-on-surface-variant mt-0.5">DeFi Infrastructure</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-surface-container rounded-lg p-3 border border-outline-variant/10">
                                        <div className="text-xs text-on-surface-variant mb-1">Bounties Paid</div>
                                        <div className="text-lg font-bold text-on-surface">24</div>
                                    </div>
                                    <div className="bg-surface-container rounded-lg p-3 border border-outline-variant/10">
                                        <div className="text-xs text-on-surface-variant mb-1">Total Volume</div>
                                        <div className="text-lg font-bold text-on-surface">$142k</div>
                                    </div>
                                </div>
                                <a className="text-sm text-primary hover:text-secondary transition-colors font-medium flex items-center justify-center gap-1" href="#">
                                    View Employer Profile
                                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
});