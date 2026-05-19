const fs = require('fs');

const data = JSON.parse(fs.readFileSync('api_response.json', 'utf8'));

const cat = "DAILY REGULATION";
const catArticles = data.filter(a => a.category === cat);

const en = catArticles.filter(a => !a.language || a.language === 'en').sort((a,b) => a.order - b.order || a.id - b.id);
const ta = catArticles.filter(a => a.language === 'ta').sort((a,b) => a.order - b.order || a.id - b.id);

console.log(`--- ${cat} ---`);
console.log('ENGLISH:');
en.forEach(a => console.log(`  Order: ${a.order} | ID: ${a.id} | Slug: ${a.slug} | Title: ${a.title}`));
console.log('TAMIL:');
ta.forEach(a => console.log(`  Order: ${a.order} | ID: ${a.id} | Slug: ${a.slug} | Title: ${a.title}`));
