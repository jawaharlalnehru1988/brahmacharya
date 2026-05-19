const fs = require('fs');

const data = JSON.parse(fs.readFileSync('api_response.json', 'utf8'));

const art132 = data.find(a => a.id === 132);
const art316 = data.find(a => a.id === 316);

console.log('Article 132:', art132 ? { id: art132.id, slug: art132.slug, title: art132.title, language: art132.language } : 'Not found');
console.log('Article 316:', art316 ? { id: art316.id, slug: art316.slug, title: art316.title, language: art316.language } : 'Not found');
