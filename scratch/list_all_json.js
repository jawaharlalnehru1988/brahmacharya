const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
                results = results.concat(walk(fullPath));
            }
        } else {
            if (file.endsWith('.json')) {
                results.push(fullPath);
            }
        }
    });
    return results;
}

const files = walk('.');
console.log(`Found ${files.length} JSON files:`);
files.forEach(f => console.log(f));
