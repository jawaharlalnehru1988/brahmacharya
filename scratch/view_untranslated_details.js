const fs = require('fs');

const untranslated = JSON.parse(fs.readFileSync('scratch/untranslated_articles.json', 'utf8'));

console.log(`First 5 untranslated articles:`);
untranslated.slice(0, 5).forEach((u, i) => {
    console.log(`\n========================================`);
    console.log(`${i+1}. ID: ${u.id} | Slug: ${u.slug}`);
    console.log(`Title: ${u.title}`);
    console.log(`Category: ${u.category}`);
    console.log(`Excerpt: ${u.excerpt}`);
    console.log(`Content Preview (first 300 chars):`);
    console.log(u.content.substring(0, 300));
});
