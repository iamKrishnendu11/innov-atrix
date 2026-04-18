const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath);
        } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Handle strings like "http://localhost:5000/api..."
            const regexDoubleQuotes = /"http:\/\/localhost:5000([^"]*)"/g;
            if (regexDoubleQuotes.test(content)) {
                content = content.replace(regexDoubleQuotes, "`${import.meta.env.VITE_API_URL || 'https://stepahead-9tra.onrender.com'}$1`");
                modified = true;
            }

            // Handle backtick templates like `http://localhost:5000/api...`
            const regexBackticks = /`http:\/\/localhost:5000([^`]*)`/g;
            if (regexBackticks.test(content)) {
                content = content.replace(regexBackticks, "`${import.meta.env.VITE_API_URL || 'https://stepahead-9tra.onrender.com'}$1`");
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

replaceInDir('src');
