const fs = require('fs');

const data = JSON.parse(fs.readFileSync('scratch/fetched_api_response.json', 'utf8'));

const english = data.filter(a => !a.language || a.language === 'en');
const tamil = data.filter(a => a.language === 'ta');

console.log(`Total English: ${english.length}`);
console.log(`Total Tamil: ${tamil.length}`);

const tamilSlugs = new Set(tamil.map(a => a.slug));
const tamilTitles = new Set(tamil.map(a => a.title));

const untranslated = [];
const translated = [];

english.forEach(e => {
    // Check if slug + '-ta' exists in Tamil
    const expectedSlugTa = `${e.slug}-ta`;
    let found = false;
    
    // Check by slug
    if (tamilSlugs.has(expectedSlugTa)) {
        found = true;
    } else {
        // Let's also check if there's any Tamil slug that contains the English slug
        const matchingTamil = tamil.find(t => t.slug.includes(e.slug) || e.slug.includes(t.slug.replace('-ta', '')));
        if (matchingTamil) {
            found = true;
        }
    }
    
    if (found) {
        translated.push(e);
    } else {
        untranslated.push(e);
    }
});

console.log(`Matched (already translated): ${translated.length}`);
console.log(`Unmatched (untranslated): ${untranslated.length}`);

console.log('\n--- FIRST 20 UNTRANSLATED ENGLISH ARTICLES ---');
untranslated.slice(0, 20).forEach((u, i) => {
    console.log(`${i+1}. ID: ${u.id} | Slug: ${u.slug} | Category: ${u.category} | Title: ${u.title}`);
});

fs.writeFileSync('scratch/untranslated_articles.json', JSON.stringify(untranslated, null, 2));
console.log('\nSaved untranslated articles to scratch/untranslated_articles.json');
