const fs = require('fs');
const path = require('path');

// 1. Load the existing api_response.json cache as the base
let articlesList = [];
if (fs.existsSync('api_response.json')) {
    try {
        const content = fs.readFileSync('api_response.json', 'utf8');
        articlesList = JSON.parse(content);
        console.log(`Loaded ${articlesList.length} articles from api_response.json`);
    } catch (e) {
        console.error('Failed to parse api_response.json:', e.message);
    }
}

// 2. Load all new local Tamil article JSON files dynamically
const newArticles = fs.readdirSync('.')
    .filter(file => file.endsWith('-ta.json') && file !== 'emotional-numbing-via-content-ta.json') // exclude reference template unless it's the only one
    .map(file => {
        console.log(`Loading new local article: ${file}`);
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    });

// Also check the reference template file if it's there
if (newArticles.length === 0 && fs.existsSync('emotional-numbing-via-content-ta.json')) {
    console.log('Loading template reference article for verification...');
    newArticles.push(JSON.parse(fs.readFileSync('emotional-numbing-via-content-ta.json', 'utf8')));
}

// 3. Merge new articles into the existing database cache (keyed by ID to prevent duplicates)
const apiMap = new Map(articlesList.map(art => [art.id, art]));
newArticles.forEach(art => {
    apiMap.set(art.id, art);
});

const finalArticlesList = Array.from(apiMap.values());
// Sort by ID for consistency
finalArticlesList.sort((a, b) => a.id - b.id);

// 4. Update api_response.json
fs.writeFileSync('api_response.json', JSON.stringify(finalArticlesList, null, 2));
console.log(`Synchronized api_response.json: now contains ${finalArticlesList.length} total articles.`);

// 5. Update app/lib/mock-db.ts
let mockDbContent = `// Simulated Database for SSR Articles
export interface Article {
    title: string;
    slug: string;
    category: string;
    content: string;
    excerpt: string;
    published_at: string;
    author: string;
}

export const mockArticles: Record<string, Article> = {
    'meaning-of-brahmacharya-in-krishna-consciousness': {
        title: 'Meaning of Brahmacharya in Krishna Consciousness',
        slug: 'meaning-of-brahmacharya-in-krishna-consciousness',
        category: 'FOUNDATIONAL RESOLUTION',
        excerpt: 'Understanding the foundational definition of purity and its role in spiritual advancement.',
        published_at: '2024-02-28',
        author: 'A.C. Bhaktivedanta Swami Prabhupada (Compiled)',
        content: \`
# Meaning of Brahmacharya in Krishna Consciousness
...
\`
    },
`;

// Append all articles
finalArticlesList.forEach(art => {
    mockDbContent += `    '${art.slug}': {
        title: '${art.title.replace(/'/g, "\\'")}',
        slug: '${art.slug}',
        category: '${art.category}',
        excerpt: '${art.excerpt.replace(/'/g, "\\'").replace(/\n/g, " ")}',
        published_at: '2026-04-11',
        author: 'Spiritual Guidance',
        content: \`
${art.content.replace(/`/g, "\\`")}
\`
    },
`;
});

mockDbContent += `};
`;

fs.writeFileSync('app/lib/mock-db.ts', mockDbContent);
console.log('Synchronized app/lib/mock-db.ts successfully!');
