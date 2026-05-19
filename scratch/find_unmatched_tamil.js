const fs = require('fs');

const data = JSON.parse(fs.readFileSync('scratch/fetched_api_response.json', 'utf8'));

const english = data.filter(a => !a.language || a.language === 'en');
const tamil = data.filter(a => a.language === 'ta');

const englishSlugs = new Set(english.map(a => a.slug));

const unmatchedTamil = [];

tamil.forEach(t => {
    // try to match with an English slug
    // remove -ta
    const baseSlug = t.slug.replace(/-ta$/, '');
    if (!englishSlugs.has(baseSlug)) {
        unmatchedTamil.push(t);
    }
});

console.log(`Unmatched Tamil articles: ${unmatchedTamil.length}`);
unmatchedTamil.forEach(t => {
    console.log(`ID: ${t.id} | Slug: ${t.slug} | Title: ${t.title}`);
});
