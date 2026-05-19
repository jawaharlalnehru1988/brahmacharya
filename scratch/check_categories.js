const fs = require('fs');

const data = JSON.parse(fs.readFileSync('api_response.json', 'utf8'));

const categories = {};
data.forEach(a => {
    const isTamil = a.language === 'ta';
    const lang = isTamil ? 'ta' : 'en';
    if (!categories[a.category]) {
        categories[a.category] = { en: [], ta: [] };
    }
    categories[a.category][lang].push(a);
});

console.log('Categories breakdown:');
for (const cat in categories) {
    const enCount = categories[cat].en.length;
    const taCount = categories[cat].ta.length;
    console.log(`- Category: "${cat}"`);
    console.log(`  English count: ${enCount}`);
    console.log(`  Tamil count:   ${taCount}`);
}
