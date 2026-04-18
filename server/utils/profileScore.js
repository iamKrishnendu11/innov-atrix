/**
 * Profile Score Calculator — Scientific Scoring Algorithm
 *
 * Analyses three dimensions of a user profile:
 *   - Skills          (35 points)
 *   - About / Description (30 points)
 *   - Past Experiences    (35 points)
 *
 * Each dimension is scored by:
 *   1. Quantity  — raw volume (word/item count)
 *   2. Quality   — specificity, keyword density, structure
 *   3. Depth     — measurable outcomes, action verbs, detail
 *
 * Returns a Number 0–100 (integer).
 */

// ── Domain knowledge dictionaries ─────────────────────────────────────────────

const TECH_SKILLS = new Set([
    "javascript","typescript","python","java","c++","c#","go","rust","ruby","php",
    "swift","kotlin","dart","scala","r","matlab","sql","nosql","bash","shell",
    "react","reactjs","next.js","nextjs","vue","vuejs","angular","svelte","nuxt",
    "node","nodejs","express","fastapi","django","flask","spring","laravel","rails",
    "mongodb","mysql","postgresql","redis","firebase","supabase","dynamodb","sqlite",
    "aws","gcp","azure","docker","kubernetes","ci/cd","github actions","terraform",
    "figma","adobe xd","sketch","photoshop","blender","unity","unreal",
    "machine learning","deep learning","nlp","computer vision","tensorflow","pytorch",
    "pandas","numpy","scikit-learn","opencv","keras","spark","hadoop",
    "graphql","rest","grpc","websocket","microservices","devops","agile","scrum",
    "html","css","tailwind","sass","bootstrap","material ui","shadcn",
    "git","github","linux","systems design","data structures","algorithms",
    "blockchain","solidity","web3","smart contracts","flutter","react native",
]);

const PROFESSIONAL_KEYWORDS = [
    "developed","built","created","designed","implemented","led","managed","optimised",
    "optimized","improved","increased","decreased","reduced","launched","delivered",
    "architected","engineered","automated","deployed","integrated","collaborated",
    "mentored","trained","researched","analyzed","analysed","authored","established",
    "coordinated","spearheaded","achieved","maintained","scaled","migrated","refactored",
];

const IMPACT_PATTERNS = [
    /\d+%/,           // percentages
    /\d+x/i,          // multiples
    /\$[\d,]+/,       // dollar amounts
    /₹[\d,]+/,        // rupee amounts
    /\d+k\b/i,        // thousands
    /\d+\s*(?:users?|clients?|customers?)/i,
    /\d+\s*(?:projects?|teams?|members?)/i,
    /reduced|increased|improved|grew|scaled/i,
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function wordCount(text) {
    if (!text || !text.trim()) return 0;
    return text.trim().split(/\s+/).length;
}

function countMatches(text, patterns) {
    if (!text) return 0;
    return patterns.reduce((n, p) => n + (p.test(text) ? 1 : 0), 0);
}

function countKeywords(text, keywords) {
    if (!text) return 0;
    const lower = text.toLowerCase();
    return keywords.filter((kw) => lower.includes(kw)).length;
}

/** Stepped scoring: maps a count to points via a piecewise linear function */
function steppedScore(value, steps) {
    // steps: [[threshold, points], ...] sorted ascending
    if (value <= 0) return 0;
    let pts = 0;
    for (const [threshold, maxPts] of steps) {
        if (value >= threshold) pts = maxPts;
        else break;
    }
    return pts;
}

// ── Dimension Scorers ─────────────────────────────────────────────────────────

/**
 * Skills Score — 35 points
 *
 * Sub-components:
 *   A. Quantity   (0-16): number of distinct, non-trivial skills
 *   B. Tech depth (0-12): recognised technology keywords
 *   C. Diversity  (0-7) : breadth across recognized categories
 */
function scoreSkills(skillsStr) {
    if (!skillsStr || !skillsStr.trim()) return 0;

    const rawSkills = skillsStr
        .split(/[,\n|;]+/)
        .map((s) => s.trim().toLowerCase())
        .filter((s) => s.length >= 2);

    const uniqueSkills = [...new Set(rawSkills)];
    const n = uniqueSkills.length;

    // A — Quantity (max 16)
    const quantityScore = steppedScore(n, [
        [1, 3], [2, 5], [3, 7], [4, 9], [5, 11],
        [6, 13], [7, 14], [8, 15], [10, 16],
    ]);

    // B — Tech depth (max 12)
    const matchedTech = uniqueSkills.filter((s) => {
        // full match OR partial match for compound names like "next.js"
        return TECH_SKILLS.has(s) || [...TECH_SKILLS].some((t) => s.includes(t) || t.includes(s));
    });
    const techScore = Math.min(12, Math.round((matchedTech.length / Math.max(n, 1)) * 12 + Math.min(matchedTech.length, 6) * 0.8));

    // C — Diversity (max 7): bonus for having > 3 recognised tech keywords
    const diversityScore = steppedScore(matchedTech.length, [
        [1, 1], [2, 2], [4, 4], [6, 6], [8, 7],
    ]);

    return Math.min(35, quantityScore + techScore + diversityScore);
}

/**
 * Description / About Score — 30 points
 *
 * Sub-components:
 *   A. Length richness (0-20): word count with diminishing returns
 *   B. Professional tone (0-7): domain action-verb density
 *   C. Structural quality (0-3): multiple sentences, punctuation
 */
function scoreDescription(description) {
    if (!description || !description.trim()) return 0;

    const wc = wordCount(description);

    // A — Length (max 20)
    const lengthScore = steppedScore(wc, [
        [5, 4], [10, 7], [20, 11], [35, 14],
        [60, 17], [100, 19], [150, 20],
    ]);

    // B — Professional tone (max 7)
    const kwMatches = countKeywords(description, PROFESSIONAL_KEYWORDS);
    const toneScore = Math.min(7, kwMatches * 2);

    // C — Structural quality (max 3)
    const sentences = description.split(/[.!?]+/).filter((s) => s.trim().length > 3).length;
    const structScore = steppedScore(sentences, [[1, 1], [2, 2], [4, 3]]);

    return Math.min(30, lengthScore + toneScore + structScore);
}

/**
 * Past Experiences Score — 35 points
 *
 * Sub-components:
 *   A. Length & detail (0-18): word count with diminishing returns
 *   B. Action verbs    (0-10): professional impact verbs
 *   C. Measurability   (0-7) : numbers, percentages, metrics
 */
function scorePastExperiences(pastExperiences) {
    if (!pastExperiences || !pastExperiences.trim()) return 0;

    const wc = wordCount(pastExperiences);

    // A — Length (max 18)
    const lengthScore = steppedScore(wc, [
        [5, 2], [15, 5], [30, 8], [60, 11],
        [100, 14], [150, 16], [200, 18],
    ]);

    // B — Action verbs (max 10)
    const verbMatches = countKeywords(pastExperiences, PROFESSIONAL_KEYWORDS);
    const verbScore = Math.min(10, verbMatches * 2);

    // C — Measurability (max 7)
    const impactMatches = countMatches(pastExperiences, IMPACT_PATTERNS);
    const impactScore = Math.min(7, impactMatches * 2);

    return Math.min(35, lengthScore + verbScore + impactScore);
}

// ── Main Export ───────────────────────────────────────────────────────────────

/**
 * calculateProfileScore({ skills, description, pastExperiences })
 * Returns: { total, breakdown: { skills, description, pastExperiences } }
 */
export function calculateProfileScore({ skills = "", description = "", pastExperiences = "" } = {}) {
    const skillsPts = scoreSkills(skills);
    const descPts   = scoreDescription(description);
    const expPts    = scorePastExperiences(pastExperiences);

    const total = Math.round(skillsPts + descPts + expPts);

    return {
        total,
        breakdown: {
            skills: { score: skillsPts, max: 35 },
            description: { score: descPts, max: 30 },
            pastExperiences: { score: expPts, max: 35 },
        },
    };
}
