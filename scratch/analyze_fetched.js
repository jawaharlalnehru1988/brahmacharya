const fs = require('fs');

const data = JSON.parse(fs.readFileSync('scratch/fetched_api_response.json', 'utf8'));

console.log(`Total fetched articles: ${data.length}`);

const tamil = data.filter(a => a.language === 'ta');
const english = data.filter(a => !a.language || a.language === 'en');

console.log(`Tamil articles: ${tamil.length}`);
console.log(`English/other articles: ${english.length}`);

// Let's group English articles by their categories/IDs
// and find out how many are translated to Tamil.
// Let's print out the list of all English articles.
console.log('\n--- ENGLISH ARTICLES (Sorted by ID) ---');
english.sort((a,b) => a.id - b.id);
english.forEach(a => {
    // Check if there is a Tamil article corresponding to this English one.
    // How do we match them? By category? Or slug?
    // Let's print ID, Title, Slug, Category.
    console.log(`ID: ${a.id} | Slug: ${a.slug} | Category: ${a.category} | Title: ${a.title.substring(0, 50)}`);
});

// Let's see if we can match English and Tamil articles.
// Let's print a few Tamil slugs to see if they end with -ta.
console.log('\n--- FIRST 10 TAMIL ARTICLES ---');
tamil.slice(0, 10).forEach(a => {
    console.log(`ID: ${a.id} | Slug: ${a.slug} | Category: ${a.category} | Title: ${a.title.substring(0, 50)}`);
});
