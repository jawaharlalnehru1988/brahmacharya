const fs = require('fs');
const { execSync } = require('child_process');

async function cleanUp() {
    try {
        // 1. Delete temporary local files first
        const tempFiles = [
            'dating-app-profile-browsing-marketplace-lust-ta.json',
            'soft-core-social-media-pages-normalization-lust-ta.json',
            'auto-playing-ads-unsolicited-visual-assault-ta.json',
            'gym-transformation-videos-cult-body-worship-ta.json',
            'beauty-product-ads-engineering-discontent-ta.json'
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
        
        console.log('Cleanup and database sync completed successfully for Batch 13!');
    } catch (err) {
        console.error('Error during cleanup:', err);
    }
}

cleanUp();
