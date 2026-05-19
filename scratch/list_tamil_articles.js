const fs = require('fs');

const data = JSON.parse(fs.readFileSync('scratch/fetched_api_response.json', 'utf8'));

const tamil = data.filter(a => a.language === 'ta');
console.log(`Found ${tamil.length} Tamil articles.`);

// Sort by ID
tamil.sort((a, b) => a.id - b.id);
tamil.forEach((a, i) => {
    console.log(`${i+1}. ID: ${a.id} | Slug: ${a.slug} | Category: ${a.category} | Title: ${a.title}`);
});
