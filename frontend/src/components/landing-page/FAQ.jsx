import React, { useState } from 'react';

const faqData = [
    {
        id: 1,
        question: "How does the matching algorithm work?",
        answer: "Our system uses semantic AI to match your unstructured request with verified student skill matrices, ensuring a perfect technical fit without relying on rigid keyword searches."
    },
    {
        id: 2,
        question: "Are there any hidden fees?",
        answer: "No. The platform is completely free for students. We charge a flat 10% convenience fee to the MSME only when a bounty is successfully funded and accepted."
    },
    {
        id: 3,
        question: "How do you verify student identities?",
        answer: "We use a Progressive Disclosure system. Initial matching is entirely blind to prevent bias, but once a contract is initiated, identities are unlocked via platform-level KYC verification."
    },
    {
        id: 4,
        question: "What happens if I'm not satisfied with the work?",
        answer: "Funds are held in escrow. If the delivered asset doesn't meet the agreed-upon bounty requirements, you can request revisions or escalate to platform mediation before funds are released."
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        // Background uses color1 (#f7f7f7)
        <section className="bg-[#f7f7f7] min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">
                    Frequently Asked <span className="text-[#e100ff]">Questions</span>
                </h2>

                <div className="space-y-4">
                    {faqData.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={faq.id}
                                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-200"
                            >
                                <button
                                    className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e100ff] focus-visible:ring-opacity-50"
                                    onClick={() => toggleFAQ(index)}
                                    aria-expanded={isOpen}
                                >
                                    <span className={`font-semibold text-lg transition-colors duration-200 ${isOpen ? 'text-[#e100ff]' : 'text-gray-800 hover:text-[#e100ff]'}`}>
                                        {faq.question}
                                    </span>

                                    {/* Plus/Minus Icon using color2 (#e100ff) */}
                                    <span className="ml-4 flex-shrink-0 text-[#e100ff]">
                                        <svg
                                            className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            {isOpen ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            )}
                                        </svg>
                                    </span>
                                </button>

                                {/* Answer Section */}
                                <div
                                    className={`px-6 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <p className="text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;