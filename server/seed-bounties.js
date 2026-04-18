import mongoose from "mongoose";
import dotenv from "dotenv";
import { Bounty } from "./models/bounty.model.js";
import { Msme } from "./models/msme.model.js";

dotenv.config();

const dbURI = process.env.MONGODB_URI;

const bountyIdeas = [
    {
        title: "Develop a Responsive Landing Page for an E-commerce Brand",
        description: "We are looking for a frontend developer to build a responsive, high-converting landing page using React and Tailwind CSS. The design has already been finalized in Figma.",
        budget: 15000,
        skill: "React",
        daysToDeadline: 14,
        isSS: true
    },
    {
        title: "Create a Social Media Dashboard in Vue.js",
        description: "Build an analytics dashboard to display social media metrics. Needs to integrate with provided mock REST APIs and use charts for data visualization.",
        budget: 25000,
        skill: "Vue.js",
        daysToDeadline: 20,
        isSS: true
    },
    {
        title: "Figma UI/UX Design for a SaaS Platform",
        description: "We need a complete redesign of our SaaS application. This includes creating a design system, user flows, and high-fidelity mockups in Figma.",
        budget: 35000,
        skill: "UI/UX",
        daysToDeadline: 30,
        isSS: true
    },
    {
        title: "Build a Custom WordPress Theme for a Local Café",
        description: "Looking for a WordPress developer to develop a custom theme from scratch. Must be SEO friendly and mobile responsive.",
        budget: 12000,
        skill: "WordPress",
        daysToDeadline: 10,
        isSS: false
    },
    {
        title: "Implement Authentication with NextAuth in Next.js App",
        description: "Add robust Google and Email/Password authentication to our existing Next.js application using NextAuth.js. Ensure protected routes are configured properly.",
        budget: 8500,
        skill: "Next.js",
        daysToDeadline: 5,
        isSS: false
    },
    {
        title: "Develop a REST API in Node.js/Express for Inventory Management",
        description: "Backend developer needed to build a RESTful API using Node.js, Express, and MongoDB for our warehouse inventory tracking system. Includes JWT auth.",
        budget: 30000,
        skill: "Node.js",
        daysToDeadline: 25,
        isSS: false
    },
    {
        title: "Python Script for Automated PDF Data Extraction",
        description: "Write a Python script using PyPDF2 or pdfminer to extract tabular data from hundreds of invoice PDFs and export them into a clean CSV format.",
        budget: 5000,
        skill: "Python",
        daysToDeadline: 3,
        isSS: false
    },
    {
        title: "React Native Mobile App UI for Fitness Tracking",
        description: "Develop the frontend UI for a fitness mobile app based on our provided designs. Needs smooth navigation and basic animations. No backend integration needed.",
        budget: 45000,
        skill: "Flutter", // Or React Native, mapping to skill tags
        daysToDeadline: 40,
        isSS: false
    },
    {
        title: "SEO Optimization and Content Strategy for Tech Blog",
        description: "Audit our current tech blog, provide an SEO strategy, and optimize the top 20 performing articles for better search engine rankings.",
        budget: 18000,
        skill: "Marketing",
        daysToDeadline: 15,
        isSS: false
    },
    {
        title: "Design a Brand Logo and Style Guide for a Startup",
        description: "We are a new AI startup needing a modern, minimalist logo and an accompanying style guide (colors, typography, usage).",
        budget: 22000,
        skill: "Design",
        daysToDeadline: 12,
        isSS: false
    },
    {
        title: "Create an Interactive Data Visualization Dashboard with Recharts",
        description: "Build a React dashboard focusing entirely on complex, interactive data visualizations for financial data using Recharts or D3.js.",
        budget: 28000,
        skill: "React",
        daysToDeadline: 21,
        isSS: false
    },
    {
        title: "Write Smart Contracts in Solidity for a DeFi Protocol",
        description: "Experienced Web3 developer needed to write and test secure Solidity smart contracts for a new decentralized finance protocol staking mechanism.",
        budget: 60000,
        skill: "Blockchain",
        daysToDeadline: 45,
        isSS: false
    }
];

const seedBounties = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log("Connected to MongoDB...");
        
        // Find existing MSMEs to assign bounties to
        const msmes = await Msme.find({});
        if (msmes.length === 0) {
            console.log("No MSMEs found in database! Please seed MSMEs first.");
            process.exit(1);
        }

        // Find "s.s enterprise" explicitly
        const ssEnterprise = await Msme.findOne({ businessName: /s\.s enterprise/i });
        
        if (!ssEnterprise) {
            console.log("Warning: 's.s enterprise' not found. We will use a random MSME instead.");
        }

        const bountiesToInsert = bountyIdeas.map(idea => {
            let assignedMsme;

            if (idea.isSS && ssEnterprise) {
                assignedMsme = ssEnterprise;
            } else {
                // Pick a random MSME
                assignedMsme = msmes[Math.floor(Math.random() * msmes.length)];
            }

            const deadlineDate = new Date();
            deadlineDate.setDate(deadlineDate.getDate() + idea.daysToDeadline);

            return {
                title: idea.title,
                description: idea.description,
                budget: idea.budget,
                skill: idea.skill,
                deadline: deadlineDate,
                status: "open",
                msme: assignedMsme._id,
                msmeBusinessName: assignedMsme.businessName,
                msmeVerified: Math.random() > 0.3 // Randomize verification status 70% chance true
            };
        });

        await Bounty.insertMany(bountiesToInsert);

        console.log(`Successfully seeded ${bountiesToInsert.length} realistic bounties!`);
        process.exit(0);

    } catch (error) {
        console.error("Error seeding bounties:", error);
        process.exit(1);
    }
};

seedBounties();
