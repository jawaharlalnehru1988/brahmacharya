const fs = require('fs');
const { execSync } = require('child_process');

async function cleanUp() {
    try {
        // 1. Fetch latest from API
        console.log('Fetching latest articles from API...');
        execSync('node scratch/fetch_api_articles.js', { stdio: 'inherit' });
        
        // 2. Overwrite local api_response.json and run sync_local_db.js
        console.log('Updating local database...');
        execSync('node scratch/update_local_db.js', { stdio: 'inherit' });
        
        // 3. Delete temporary local files
        const tempFiles = [
            'mangal-arati-consciousness-ta.json',
            'movie-poster-hyper-sexualisation-war-on-visual-purity-ta.json',
            'sexual-curiosity-marketing-traps-ta.json',
            'party-nightlife-promotion-traps-ta.json',
            'gossip-networks-prajalpa-traps-ta.json'
        ];
        
        tempFiles.forEach(file => {
            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
                console.log(`Removed temporary file: ${file}`);
            }
        });
        
        console.log('Cleanup completed successfully!');
    } catch (err) {
        console.error('Error during cleanup:', err);
    }
}

cleanUp();
