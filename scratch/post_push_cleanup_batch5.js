const fs = require('fs');
const { execSync } = require('child_process');

async function cleanUp() {
    try {
        // 1. Delete temporary local files first to prevent undefined ID merges
        const tempFiles = [
            'fall-down-narratives-scriptural-cases-ta.json',
            'overeating-and-lust-ta.json',
            'bathing-internal-external-purification-ta.json',
            'meme-pages-hidden-sensuality-trojan-horse-distraction-ta.json',
            'bollywood-sensual-songs-traps-ta.json'
        ];
        
        tempFiles.forEach(file => {
            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
                console.log(`Removed temporary file: ${file}`);
            }
        });

        // 2. Fetch latest from API
        console.log('Fetching latest articles from API...');
        execSync('node scratch/fetch_api_articles.js', { stdio: 'inherit' });
        
        // 3. Overwrite local api_response.json and run sync_local_db.js
        console.log('Updating local database...');
        execSync('node scratch/update_local_db.js', { stdio: 'inherit' });
        
        console.log('Cleanup and database sync completed successfully!');
    } catch (err) {
        console.error('Error during cleanup:', err);
    }
}

cleanUp();
