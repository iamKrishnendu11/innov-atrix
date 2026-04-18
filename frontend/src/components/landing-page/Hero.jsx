"use client"

import SoftAurora from "../SoftAurora"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const avatars = [
    "https://i.pravatar.cc/100?img=1",
    "https://i.pravatar.cc/100?img=2",
    "https://i.pravatar.cc/100?img=3",
    "https://i.pravatar.cc/100?img=4",
    "https://i.pravatar.cc/100?img=5",
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
}

export default function Hero() {
    const navigate = useNavigate()

    return (
        <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-20">

            {/* 🌌 Aurora BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <SoftAurora
                    speed={0.6}
                    scale={1.5}
                    brightness={1}
                    color1="#f7f7f7"
                    color2="#e100ff"
                    noiseFrequency={2.5}
                    noiseAmplitude={1}
                    bandHeight={0.5}
                    bandSpread={1}
                    octaveDecay={0.1}
                    layerOffset={0}
                    colorSpeed={1}
                    enableMouseInteraction
                    mouseInfluence={0.25}
                />
            </div>

            {/* 🔥 Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

            {/* 🌟 CONTENT */}
            <motion.div
                className="text-3xl relative z-10 w-full text-center px-4 flex flex-col items-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >

                {/* 🔥 Heading */}
                <motion.h1
                    style={{
                        fontFamily: "'Monoton', cursive",
                        fontWeight: 400,
                    }}
                    variants={itemVariants}
                    className="text-[clamp(3rem,12vw,18rem)] leading-[0.85] tracking-tight text-center w-full mb-6"
                >
                    <span className="bg-gradient-to-r from-white via-purple-300 to-pink-400 bg-clip-text text-transparent">
                        The Talent Exists.
                    </span>
                    <br />
                    <span className="text-zinc-400">The Access Doesn’t.</span>
                </motion.h1>

                {/* ✨ Lighter Paragraph */}
                <motion.p
                    variants={itemVariants}
                    style={{
                        fontFamily: "'Monoton', cursive",
                    }}
                    className="text-base sm:text-lg lg:text-xl text-zinc-100 font-extralight max-w-2xl mx-auto mb-10 leading-relaxed text-center"
                >
                    We empower overlooked students to prove themselves, connect with real work, and unlock opportunities that go beyond college names and outdated hiring biases.
                </motion.p>

                {/* 🔘 Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap gap-4 justify-center pt-4 sm:pt-6 mb-16 w-full"
                >
                    <button
                        onClick={() => navigate("/msme/login")}
                        className="bg-white text-black px-6 py-2.5 text-sm rounded-full font-medium hover:bg-zinc-200 transition-colors cursor-pointer"
                    >
                        Hire Talent
                    </button>
                    <button className="border border-white/20 px-6 py-2.5 text-sm rounded-full text-white hover:bg-white/10 transition-colors">
                        Find Work
                    </button>
                </motion.div>

                {/* 👥 Avatars */}
                <motion.div variants={itemVariants} className="flex flex-col items-center">
                    <div className="flex justify-center -space-x-3 mb-4">
                        {avatars.map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                className="w-12 h-12 rounded-full border-2 border-black"
                            />
                        ))}
                    </div>

                    <p className="text-sm text-zinc-400">
                        Trusted by <span className="text-white font-medium">2,000+</span> teams
                    </p>
                </motion.div>
            </motion.div>
        </section>
    )
}