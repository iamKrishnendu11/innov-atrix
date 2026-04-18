"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useNavigate } from "react-router-dom"
import BorderGlow from "../BorderGlow.jsx"

export default function ProfileForm({ form1Data, onBack }) {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        description: "",
        skills: "",
        githubUrl: "",
        linkedinUrl: "",
        pastExperiences: "",
        portfolioLink: "",
    })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const payload = {
                // Form 1 data
                name: form1Data.name,
                email: form1Data.email,
                phone: form1Data.phone,
                password: form1Data.password,
                // Form 2 data
                description: formData.description,
                skills: formData.skills,
                githubUrl: formData.githubUrl,
                linkedinUrl: formData.linkedinUrl,
                pastExperiences: formData.pastExperiences,
                portfolioLink: formData.portfolioLink,
            }

            console.log("Form1 Data passed from step 1:", form1Data);
            console.log("Final Payload being sent:", payload);

            const res = await fetch(`${import.meta.env.VITE_API_URL || 'https://stepahead-9tra.onrender.com'}/api/users/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message || "Registration failed. Please try again.")
                return
            }

            // Success → redirect to login
            navigate("/login")
        } catch (err) {
            setError("Could not connect to server. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 overflow-y-auto bg-black/70 backdrop-blur-sm z-50"
        >
            {/* inner wrapper — handles centering + allows scrolling */}
            <div className="flex min-h-full items-center justify-center py-10 px-4">
                <motion.div
                    initial={{ scale: 0.9, y: 30 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <BorderGlow
                        edgeSensitivity={30}
                        glowColor="40 80 80"
                        backgroundColor="#0a0a0a"
                        borderRadius={28}
                        glowRadius={40}
                        glowIntensity={1}
                        coneSpread={25}
                        animated={false}
                        colors={['#c084fc', '#f472b6', '#38bdf8']}
                    >
                        <div className="w-[700px] max-w-[95vw] rounded-2xl bg-zinc-950 border border-white/10 p-8">

                            {/* HEADER */}
                            <h2 className="text-xl font-bold text-white">
                                Complete Your Profile
                            </h2>
                            <p className="text-sm text-zinc-400 mt-2">
                                Tell us more about yourself
                            </p>

                            <form className="my-8 space-y-4" onSubmit={handleSubmit}>

                                {/* ABOUT */}
                                <TextAreaField
                                    id="description"
                                    label="Describe Yourself"
                                    placeholder="Tell us about yourself..."
                                    value={formData.description}
                                    onChange={handleChange}
                                />

                                {/* SKILLS */}
                                <MultiSelectField
                                    id="skills"
                                    label="Skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    options={[
                                        "Web Development",
                                        "App Development",
                                        "Social Media Manager",
                                        "Marketing",
                                        "Video Editing",
                                        "SEO Optimizer",
                                        "Growth Strategist",
                                        "UI/UX Design",
                                        "Data Science",
                                        "Backend Engineering"
                                    ]}
                                />

                                {/* GITHUB */}
                                <InputField
                                    id="githubUrl"
                                    label="GitHub URL"
                                    type="url"
                                    placeholder="https://github.com/username"
                                    value={formData.githubUrl}
                                    onChange={handleChange}
                                />

                                {/* LINKEDIN */}
                                <InputField
                                    id="linkedinUrl"
                                    label="LinkedIn URL"
                                    type="url"
                                    placeholder="https://linkedin.com/in/username"
                                    value={formData.linkedinUrl}
                                    onChange={handleChange}
                                />

                                {/* EXPERIENCE */}
                                <TextAreaField
                                    id="pastExperiences"
                                    label="Past Experience"
                                    placeholder="Your experience..."
                                    value={formData.pastExperiences}
                                    onChange={handleChange}
                                />

                                {/* PORTFOLIO */}
                                <InputField
                                    id="portfolioLink"
                                    label="Portfolio (optional)"
                                    type="url"
                                    placeholder="https://yourportfolio.com"
                                    value={formData.portfolioLink}
                                    onChange={handleChange}
                                />

                                {/* ERROR */}
                                {error && (
                                    <p className="text-red-400 text-sm">{error}</p>
                                )}

                                {/* BUTTONS */}
                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={onBack}
                                        disabled={loading}
                                        className="w-1/2 h-10 rounded-md bg-zinc-800 text-white hover:bg-zinc-700 transition disabled:opacity-60"
                                    >
                                        Back
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-1/2 h-10 rounded-md bg-gradient-to-br from-violet-600 to-pink-500 text-white font-medium relative group overflow-hidden disabled:opacity-60 hover:opacity-90 transition"
                                    >
                                        {loading ? "Submitting..." : "Submit"}
                                        <BottomGradient />
                                    </button>
                                </div>
                            </form>

                        </div>
                    </BorderGlow>
                </motion.div>
            </div>
        </motion.div>
    )
}

/* INPUT */
const InputField = ({ id, label, value, onChange, ...props }) => (
    <div>
        <Label className="text-zinc-300" htmlFor={id}>{label}</Label>
        <Input
            id={id}
            value={value}
            onChange={onChange}
            {...props}
            className="bg-zinc-900 border border-white/10 text-white placeholder:text-zinc-500 mt-1"
        />
    </div>
)

/* TEXTAREA */
const TextAreaField = ({ id, label, placeholder, value, onChange }) => (
    <div>
        <Label className="text-zinc-300" htmlFor={id}>{label}</Label>
        <textarea
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full mt-1 h-20 p-2 rounded-md bg-zinc-900 border border-white/10 text-white placeholder:text-zinc-500 resize-none focus:outline-none focus:border-violet-500"
        />
    </div>
)

/* MULTI SELECT */
const MultiSelectField = ({ id, label, value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const selectedOptions = value ? value.split(",").map(s => s.trim()).filter(Boolean) : [];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleOption = (option) => {
        let newSelection;
        if (selectedOptions.includes(option)) {
            newSelection = selectedOptions.filter(o => o !== option);
        } else {
            newSelection = [...selectedOptions, option];
        }
        onChange({ target: { id, value: newSelection.join(", ") } });
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <Label className="text-zinc-300 block mb-1" htmlFor={id}>{label}</Label>
            <div 
                className="w-full min-h-[42px] mt-1 p-2 rounded-md bg-zinc-900 border border-white/10 text-white cursor-pointer focus-within:border-violet-500 relative flex flex-wrap gap-2 items-center transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedOptions.length === 0 ? (
                    <span className="text-zinc-500 text-sm px-1">Select your skills...</span>
                ) : (
                    selectedOptions.map(opt => (
                        <span key={opt} className="bg-zinc-800 text-xs px-2 py-1 rounded-md border border-zinc-700 flex items-center gap-1 hover:bg-zinc-700 transition">
                            {opt}
                            <span 
                                className="text-zinc-400 hover:text-white cursor-pointer -mr-1 px-1 text-sm leading-none"
                                onClick={(e) => { e.stopPropagation(); toggleOption(opt); }}
                            >
                              ×
                            </span>
                        </span>
                    ))
                )}
                
                <div className="ml-auto pr-2 flex items-center justify-center">
                    <span className="material-symbols-outlined text-zinc-500 text-[18px]">
                        {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-zinc-950 border border-white/10 rounded-md shadow-[0_10px_30px_rgba(0,0,0,0.8)] max-h-56 overflow-y-auto">
                    {options.map(option => {
                        const isSelected = selectedOptions.includes(option);
                        return (
                            <div 
                                key={option}
                                onClick={() => toggleOption(option)}
                                className="px-4 py-2.5 hover:bg-zinc-800/80 cursor-pointer flex items-center text-sm text-zinc-300 transition-colors"
                            >
                                <div className={`w-4 h-4 mr-3 border rounded text-[10px] flex items-center justify-center transition-colors ${isSelected ? 'bg-primary border-primary text-black font-bold' : 'border-zinc-600'}`}>
                                    {isSelected && "✓"}
                                </div>
                                {option}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
};

/* GRADIENT */
const BottomGradient = () => (
    <>
        <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
        <span className="absolute inset-x-10 -bottom-px h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm group-hover:opacity-100 transition duration-500" />
    </>
)