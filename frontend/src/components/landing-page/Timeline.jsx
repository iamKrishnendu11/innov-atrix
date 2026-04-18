import React from "react";

export default function CyberDriftTimeline() {
    return (
        <div
            className="bg-background text-on-background font-body selection:bg-primary selection:text-on-primary min-h-screen flex items-center justify-center p-8 overflow-x-hidden dark"
            lang="en"
        >
            {/* Atmospheric Mesh Gradients */}
            <div className="fixed inset-0 pointer-events-none mesh-gradient-bg z-0"></div>

            <main className="relative z-10 w-full max-w-7xl mx-auto">

                {/* HEADER */}
                <header className="mb-24 flex flex-col md:flex-row items-end justify-between gap-8">
                    <div className="max-w-2xl">
                        <span className="font-label text-primary tracking-[0.2em] uppercase text-xs font-bold block mb-4">
                            The Journey
                        </span>

                        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-none italic">
                            THE STEP-A-HEAD <span className="text-tertiary">ARCHITECTURE</span>
                        </h1>
                    </div>

                    <div className="hidden md:block w-32 h-px bg-outline-variant/30 self-center"></div>

                    <p className="font-body text-on-surface-variant max-w-xs text-sm leading-relaxed text-right md:text-left">
                        Frictionless onboarding, college-blind matching, and guaranteed accountability—from post to payout.
                    </p>
                </header>

                {/* TIMELINE */}
                <section className="relative">
                    <div className="absolute top-[60px] left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/40 to-tertiary/0 hidden lg:block"></div>

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-6 relative z-20">

                        {/* STEP 01 */}
                        <Step number="01" icon="rocket_launch" color="primary" title="Register"
                            text="Quick dual onboarding. Students use college IDs; MSMEs use a simple phone OTP for zero-friction entry.."
                        />

                        {/* STEP 02 */}
                        <Step number="02" icon="hub" color="tertiary" title="Skill Fetch"
                            text="No fake resumes. Portfolios or 10-minute micro-assessments instantly generate a verified baseline AI skill score.
"
                            offset
                        />

                        {/* STEP 03 */}
                        <Step number="03" icon="dataset" color="primary" title="Task Upload"
                            text="Jargon-free posting. MSMEs write everyday prompts; our AI translates them into hard technical requirements."
                        />

                        {/* STEP 04 */}
                        <Step number="04" icon="sync_alt" color="tertiary" title="Semantic Match"
                            text="The AI maps unstructured prompts to verified student capabilities, surfacing the top 3 anonymous candidates."
                            offset
                        />

                        {/* STEP 05 */}
                        <Step number="05" icon="auto_awesome" color="primary" title="Handshake"
                            text="Initial matching is completely college-blind. Funding the bounty unlocks verified identities to guarantee accountability."
                        />

                    </div>
                </section>

                {/* FOOTER */}

            </main>
        </div>
    );
}

/* Reusable Step Component */
function Step({ number, icon, title, text, color, offset }) {
    return (
        <div className={`group relative flex-1 flex flex-col ${offset ? "lg:mt-16" : ""}`}>

            <div className="flex items-center gap-6 mb-8 lg:flex-col lg:items-start lg:gap-4">

                <div
                    className={`w-16 h-16 rounded-full glass-card flex items-center justify-center border transition-all duration-500 group-hover:scale-110 ${color === "primary"
                        ? "border-primary/20 shadow-[0_0_30px_-5px_rgba(255,130,217,0.3)] group-hover:border-primary"
                        : "border-tertiary/20 shadow-[0_0_30px_-5px_rgba(153,247,255,0.3)] group-hover:border-tertiary"
                        }`}
                >
                    <span className={`material-symbols-outlined text-3xl ${color === "primary" ? "text-primary" : "text-tertiary"}`}>
                        {icon}
                    </span>
                </div>

                <div className="font-headline text-4xl font-black text-outline-variant/20 lg:order-first">
                    {number}
                </div>
            </div>

            <div className="surface-container-low p-8 rounded-lg transition-all duration-500 group-hover:bg-surface-container-high relative overflow-hidden">

                <div
                    className={`absolute top-0 left-0 w-1 h-full transition-colors ${color === "primary"
                        ? "bg-primary/30 group-hover:bg-primary"
                        : "bg-tertiary/30 group-hover:bg-tertiary"
                        }`}
                ></div>

                <h3 className="font-headline text-xl font-bold mb-4 uppercase tracking-tight text-on-surface">
                    {title}
                </h3>

                <p className="text-on-surface-variant text-sm leading-relaxed">
                    {text}
                </p>
            </div>
        </div>
    );
}