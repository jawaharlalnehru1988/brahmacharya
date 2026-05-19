const fs = require('fs');

const data = JSON.parse(fs.readFileSync('api_response.json', 'utf8'));

const targets = [
    'avoiding-complacency-spiritual-danger',
    'internal-satisfaction-atmarama',
    'avoiding-despair-after-fall',
    'lessons-from-ajamila-digital-warning',
    'regulated-eating-timings'
];

let out = "";
targets.forEach((slug, i) => {
    const u = data.find(a => a.slug === slug);
    if (!u) {
        console.warn(`Could not find article with slug: ${slug}`);
        return;
    }
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

fs.writeFileSync('scratch/next_5_untranslated_batch3.txt', out);
console.log('Saved to scratch/next_5_untranslated_batch3.txt');
