"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PricingSection() {
    const [isAnnual, setIsAnnual] = useState(true)

    const pricingPlans = [
        {
            name: "Micro-Transaction Fee",
            monthlyPrice: "0% / 10%",
            annualPrice: "0% / 10%",
            description: "Flexible earning model for students and MSMEs.",
            features: [
                "0% Fee for Students — Talent keeps 100% of earnings",
                "10% Platform Fee for MSMEs applied at checkout",
                "Example: ₹500 bounty → MSME pays ₹550",
                "Designed to encourage rapid portfolio building",
            ],
            buttonText: "Get Started",
            buttonClass:
                "bg-zinc-300 text-gray-800 hover:bg-zinc-400",
        },
        {
            name: "Pro-Tier Subscription",
            monthlyPrice: "₹999",
            annualPrice: "₹999",
            description: "For power users, agencies, and high-volume users.",
            features: [
                "Targeted for local agencies & shop owners",
                "Also suitable for advanced students",
                "Waived transaction fees",
                "Priority AI matching",
                "Bulk-bounty posting capabilities",
            ],
            buttonText: "Upgrade Now",
            buttonClass:
                "bg-primary-foreground text-primary hover:bg-primary-foreground/90",
            popular: true,
        },
        {
            name: "B2B EdTech Partnerships",
            monthlyPrice: "Enterprise",
            annualPrice: "Enterprise",
            description: "AI-powered education and lead generation ecosystem.",
            features: [
                "Data-Driven Upskilling via AI skill tracking",
                "Identifies most requested MSME skills",
                "Lead generation through EdTech partnerships",
                "Discounted targeted courses for students",
                "Bridges skill gap between learners and industry",
            ],
            buttonText: "Contact Sales",
            buttonClass:
                "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        },
    ]

    return (
        <section className="w-full px-5 flex flex-col items-center py-10">
            {/* Header */}
            <div className="pt-20"></div>
            <div className="text-center mb-10">
                <h1 className="text-5xl md:text-7xl font-bold">
                    Premium Plans
                </h1>
                <p className="text-sm text-muted-foreground mt-3">
                    A scalable ecosystem powered by transactions, subscriptions, and partnerships
                </p>
            </div>

            {/* Cards */}
            <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
                {pricingPlans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`flex-1 p-6 rounded-xl border flex flex-col gap-6 ${plan.popular ? "bg-primary text-white shadow-lg" : "bg-white"
                            }`}
                    >
                        {/* Title */}
                        <div>
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                                {plan.name}
                                {plan.popular && (
                                    <span className="text-xs bg-white text-primary px-2 py-0.5 rounded-full">
                                        Popular
                                    </span>
                                )}
                            </h3>

                            <p className="text-sm mt-2 opacity-80">
                                {plan.description}
                            </p>

                            <div className="text-2xl font-bold mt-3">
                                {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                            </div>
                        </div>

                        {/* Button */}
                        <Button className={`rounded-full ${plan.buttonClass}`}>
                            {plan.buttonText}
                        </Button>

                        {/* Features */}
                        <div className="flex flex-col gap-3">
                            {plan.features.map((feature) => (
                                <div key={feature} className="flex items-start gap-2 text-sm">
                                    <Check className="w-4 h-4 mt-1" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="pb-20"></div>
        </section>
    )
}