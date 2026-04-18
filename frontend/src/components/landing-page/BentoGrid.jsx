import React from "react";

function BentoGrid() {
    return (
        <div>
            <meta charSet="utf-8" />
            <meta content="width=device-width, initial-scale=1.0" name="viewport" />
            <title>The Architecture of Merit</title>

            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />

            <style>{`
        .mesh-bg {
          background-image:
            radial-gradient(circle at 15% 50%, rgba(255, 130, 217, 0.15), transparent 40%),
            radial-gradient(circle at 85% 30%, rgba(153, 247, 255, 0.15), transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(196, 127, 255, 0.1), transparent 50%);
        }

        .glow-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glow-card:hover {
          box-shadow: 0 0 40px rgba(255, 130, 217, 0.15);
          transform: translateY(-4px);
        }
      `}</style>

            {/* TopNavBar */}
            <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto relative mesh-bg">

                {/* Header Section */}
                <div className="mb-24 md:w-2/3">
                    <h2 className="font-headline text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4">
                        Step-A-Head
                    </h2>

                    <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-none">
                        The One Stop <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">
                            Solution
                        </span>
                    </h1>

                    <p className="font-body text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed">
                        STEP-A-HEAD is an AI freelance platform connecting Tier-2 students with local MSMEs through college-blind, merit-based digital micro-bounties.
                    </p>
                </div>

                {/* Features Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">

                    {/* Feature 01 */}
                    <div className="md:col-span-8 bg-surface-container-high rounded-lg p-10 glow-card relative overflow-hidden group">
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-700" />

                        <div className="flex justify-between items-start mb-16 relative z-10">
                            <span className="material-symbols-outlined text-4xl text-primary">
                                visibility_off
                            </span>
                            <span className="font-headline text-surface-bright text-6xl font-black">
                                01
                            </span>
                        </div>

                        <h3 className="font-headline text-2xl font-bold mb-4 text-on-surface">
                            College-Blind
                        </h3>

                        <p className="font-body text-on-surface-variant leading-relaxed max-w-md">
                            AI Matching Semantic AI translates what an MSME wants into technical skills, instantly matching them with the right student while hiding the college name to kill bias.
                        </p>
                    </div>

                    {/* Feature 02 */}
                    <div className="md:col-span-4 bg-surface-container-high rounded-lg p-10 glow-card relative overflow-hidden group">
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-tertiary/10 rounded-full blur-3xl group-hover:bg-tertiary/20 transition-colors duration-700" />

                        <div className="flex justify-between items-start mb-16 relative z-10">
                            <span className="material-symbols-outlined text-4xl text-tertiary">
                                verified
                            </span>
                            <span className="font-headline text-surface-bright text-6xl font-black">
                                02
                            </span>
                        </div>

                        <h3 className="font-headline text-2xl font-bold mb-4 text-on-surface">
                            Verified Proof-of-Work
                        </h3>

                        <p className="font-body text-on-surface-variant">
                            We replace easily faked resumes with a dynamic, merit-based score calculated from actual platform performance and micro-assessments.
                        </p>
                    </div>

                    {/* Feature 03 */}
                    <div className="md:col-span-4 bg-surface-container-high rounded-lg p-10 glow-card">
                        <div className="flex justify-between items-start mb-16 relative z-10">
                            <span className="material-symbols-outlined text-4xl text-tertiary">
                                verified
                            </span>
                            <span className="font-headline text-surface-bright text-6xl font-black">
                                03
                            </span>
                        </div>

                        <h3 className="font-headline text-2xl font-bold mb-4 text-on-surface">
                            Low-Risk Bounties
                        </h3>

                        <p className="font-body text-on-surface-variant">
                            MSMEs post bite-sized, low-cost tasks (e.g., ₹500). This removes the financial risk of hiring while letting students rapidly build real-world portfolios.
                        </p>
                    </div>

                    {/* Feature 04 */}
                    <div className="md:col-span-4 bg-surface-container-high rounded-lg p-10 glow-card">
                        <div className="flex justify-between items-start mb-16 relative z-10">
                            <span className="material-symbols-outlined text-4xl text-tertiary">
                                verified
                            </span>
                            <span className="font-headline text-surface-bright text-6xl font-black">
                                04
                            </span>
                        </div>

                        <h3 className="font-headline text-2xl font-bold mb-4 text-on-surface">
                            Progressive Trust & KYC Matching
                        </h3>

                        <p className="font-body text-on-surface-variant">
                            Progressive Trust & KYC Matching stays strictly anonymous to ensure fairness. But the moment a bounty is funded, the student’s KYC-verified identity unlocks to ensure accountability.
                        </p>
                    </div>

                    {/* Feature 05 */}
                    <div className="md:col-span-4 bg-surface-container-high rounded-lg p-10 glow-card">
                        <div className="flex justify-between items-start mb-16 relative z-10">
                            <span className="material-symbols-outlined text-4xl text-tertiary">
                                verified
                            </span>
                            <span className="font-headline text-surface-bright text-6xl font-black">
                                05
                            </span>
                        </div>

                        <h3 className="font-headline text-2xl font-bold mb-4 text-on-surface">
                            Jargon-Free Onboarding
                        </h3>

                        <p className="font-body text-on-surface-variant">
                            Local shop owners post jobs in plain, everyday language. Our AI handles the translation into technical requirements under the hood.
                        </p>
                    </div>

                </div>
            </main>
        </div>
    );
}

export default BentoGrid;