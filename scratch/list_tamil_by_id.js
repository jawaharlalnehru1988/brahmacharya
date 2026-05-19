const fs = require('fs');

const data = JSON.parse(fs.readFileSync('api_response.json', 'utf8'));
const tamil = data.filter(a => a.language === 'ta');

tamil.sort((a, b) => a.id - b.id);

console.log(`Total Tamil articles in api_response.json: ${tamil.length}`);
tamil.forEach((t, i) => {
    console.log(`${i+1}. ID: ${t.id} | Slug: ${t.slug} | Title: ${t.title}`);
});
