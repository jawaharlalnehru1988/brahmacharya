const fs = require('fs');

const untranslated = JSON.parse(fs.readFileSync('scratch/untranslated_articles.json', 'utf8'));

let out = "";
untranslated.slice(0, 5).forEach((u, i) => {
    out += `\n========================================\n`;
    out += `ARTICLE ${i+1}\n`;
    out += `ID: ${u.id}\n`;
    out += `Slug: ${u.slug}\n`;
    out += `Category: ${u.category}\n`;
    out += `Order: ${u.order}\n`;
    out += `Title: ${u.title}\n`;
    out += `Excerpt: ${u.excerpt}\n`;
    out += `Content:\n${u.content}\n`;
});

fs.writeFileSync('scratch/first_5_untranslated.txt', out);
console.log('Saved to scratch/first_5_untranslated.txt');
