// CrazyTextScroll.jsx
import React from "react";
import { ScrollVelocityContainer, ScrollVelocityRow } from "../ui/Scroll-Based-velocity";

export default function ScrollText() {
    const text = "I turn lines of code into creations, and launch them into the world to live and breathe";

    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-10 bg-black">
            {/* Scroll-based velocity text */}
            <ScrollVelocityContainer className="text-4xl font-bold tracking-[-0.02em] md:text-8xl md:leading-[5rem] text-white whitespace-nowrap">
                <ScrollVelocityRow baseVelocity={1} direction={1}>
                    {text} • {text} • {text} • {text} • {text} •
                </ScrollVelocityRow>
                <ScrollVelocityRow baseVelocity={1} direction={-1}>
                    {text} • {text} • {text} • {text} • {text} •
                </ScrollVelocityRow>
            </ScrollVelocityContainer>

            {/* Gradient fade on edges */}
            <div className="from-black pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
            <div className="from-black pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
        </div>
    );
}
