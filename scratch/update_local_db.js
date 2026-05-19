const fs = require('fs');
const { execSync } = require('child_process');

if (!fs.existsSync('scratch/fetched_api_response.json')) {
    console.error('fetched_api_response.json not found! Run fetch_api_articles.js first.');
    process.exit(1);
}

const data = fs.readFileSync('scratch/fetched_api_response.json', 'utf8');
fs.writeFileSync('api_response.json', data);
console.log('Overwrote api_response.json with the 355 articles from API.');

try {
    const output = execSync('node sync_local_db.js', { encoding: 'utf8' });
    console.log('Executed sync_local_db.js output:');
    console.log(output);
} catch (err) {
    console.error('Failed to run sync_local_db.js:', err);
}
