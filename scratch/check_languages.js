const fs = require('fs');

if (!fs.existsSync('api_response.json')) {
    console.error('api_response.json not found!');
    process.exit(1);
}

const articles = JSON.parse(fs.readFileSync('api_response.json', 'utf8'));
console.log(`Total articles in api_response.json: ${articles.length}`);

const tamilArticles = articles.filter(a => a.language === 'ta');
const englishArticles = articles.filter(a => !a.language || a.language === 'en');

console.log(`Tamil articles ("language": "ta"): ${tamilArticles.length}`);
console.log(`English articles: ${englishArticles.length}`);

// We want to map which English articles are translated vs not.
// Let's look at the slug or id relation.
// Usually, Tamil articles have slug ending with '-ta' or something similar? Or they have the same content structure?
// Let's check how they are related. E.g.
// id: 5, slug: "instagram-reels-sensual-content-loop-ta", title: "இன்ஸ்டாகிராம் ரீல்ஸ் கவர்ச்சி உள்ளடக்கச் சுழல் (Instagram Reels Sensual Content Loop)"
// English counterpart: maybe "instagram-reels-sensual-content-loop"?
// Let's see:
console.log('\n--- SAMPLE TAMIL ARTICLES ---');
tamilArticles.slice(0, 5).forEach(a => {
    console.log(`ID: ${a.id}, Title: ${a.title}, Slug: ${a.slug}`);
});

console.log('\n--- SAMPLE ENGLISH ARTICLES ---');
englishArticles.slice(0, 5).forEach(a => {
    console.log(`ID: ${a.id}, Title: ${a.title}, Slug: ${a.slug}`);
});
