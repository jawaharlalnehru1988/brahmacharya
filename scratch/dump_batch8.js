const fs = require('fs');

const data = JSON.parse(fs.readFileSync('api_response.json', 'utf8'));

const targets = [
    'western-pop-lyrics-manipulation',
    'social-drinking-pressure-workplace',
    'fast-food-overstimulation-rajas',
    'night-time-phone-usage-tamas',
    'balanced-austerity-yukta-vairagya'
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

fs.writeFileSync('scratch/next_5_untranslated_batch8.txt', out);
console.log('Saved to scratch/next_5_untranslated_batch8.txt');
