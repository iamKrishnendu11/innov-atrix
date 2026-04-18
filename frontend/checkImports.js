import fs from 'fs';
import path from 'path';

function checkImports(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            checkImports(fullPath);
        } else if (file.match(/\.jsx?$/)) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const imports = content.match(/import\s+.*?\s+from\s+['"](.*?)['"]/g) || [];
            for (const imp of imports) {
                const match = imp.match(/from\s+['"](.*?)['"]/);
                if (match) {
                    let impPath = match[1];
                    if (impPath.startsWith('.')) {
                        let targetPath = path.join(path.dirname(fullPath), impPath);
                        if (!fs.existsSync(targetPath)) {
                            if (fs.existsSync(targetPath + '.js')) targetPath += '.js';
                            else if (fs.existsSync(targetPath + '.jsx')) targetPath += '.jsx';
                        }
                        
                        if (fs.existsSync(targetPath)) {
                            const exactName = fs.readdirSync(path.dirname(targetPath))
                                                .find(f => f.toLowerCase() === path.basename(targetPath).toLowerCase());
                            if (exactName !== path.basename(targetPath)) {
                                console.log('ERROR in ' + fullPath + ': ' + impPath + ' matches ' + exactName + ' but case is wrong');
                            }
                        } else {
                            console.log('UNRESOLVED in ' + fullPath + ': ' + impPath);
                        }
                    }
                }
            }
        }
    }
}

checkImports('src');
