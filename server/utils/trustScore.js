// Utility to calculate Trust Score out of 100
// Only visible to MSME.

export function calculateTrustScore(student, task) {
    if (!student) return 0;
    let score = 0;

    // 1. Profile score (Max 15%)
    // student.profileScore ranges from 0-100 built-in.
    const profileScoreShare = ((student.profileScore || 0) / 100) * 15;
    score += profileScoreShare;

    // 2. Previous Tasks Completed (Max 30%)
    // Let's cap at 5 tasks for full 30% points
    const tasksCompleted = student.tasksCompleted || 0;
    const taskScore = Math.min((tasksCompleted / 5) * 30, 30);
    score += taskScore;

    // 3. Previous Bounties Completed (Max 30%)
    // Cap at 5 bounties for full 30% points 
    const bountiesCompleted = student.bountiesCompleted || 0;
    const bountyScore = Math.min((bountiesCompleted / 5) * 30, 30);
    score += bountyScore;

    // 4. Keyword Matching (Max 15%)
    // TF intersection between task data and student data
    let keywordScore = 0;
    if (task) {
        const studentData = `${student.skills || ""} ${student.description || ""}`.toLowerCase();
        const taskWords = `${task.skill || ""} ${task.description || ""}`
            .toLowerCase()
            .replace(/[^\w\s]/g, "")
            .split(/\s+/)
            .filter(w => w.length > 2); // Exclude very small generic words

        if (taskWords.length > 0 && studentData) {
            let matches = 0;
            const uniqueTaskWords = [...new Set(taskWords)];
            uniqueTaskWords.forEach(word => {
                if (studentData.includes(word)) matches++;
            });
            keywordScore = Math.min((matches / uniqueTaskWords.length) * 15, 15);
        }
    }
    score += keywordScore;

    // 5. Rating (Max 10%)
    // Scaling user rating (out of 5) to 0-10
    const ratingScore = ((student.rating || 0) / 5) * 10;
    score += ratingScore;

    return Math.round(score);
}
