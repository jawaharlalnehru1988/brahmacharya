const fs = require('fs');
const { execSync } = require('child_process');

async function cleanUp() {
    try {
        // 1. Delete temporary local files first to prevent undefined ID merges
        const tempFiles = [
            'walking-japa-vs-sitting-japa-ta.json',
            'dress-code-modesty-brahmacharya-ta.json',
            'fashion-influencer-culture-illusion-aesthetic-purity-ta.json',
            'fan-fiction-communities-traps-ta.json',
            'late-night-work-isolation-traps-ta.json',
            'relationship-goal-fantasies-trap-ta.json'
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
