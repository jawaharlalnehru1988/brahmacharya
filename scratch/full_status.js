const fs = require('fs');

const data = JSON.parse(fs.readFileSync('api_response.json', 'utf8'));

// Unique categories in order of appearance or defined array
const categories = [
    "FOUNDATIONAL RESOLUTION",
    "DAILY REGULATION",
    "CHANTING INFRASTRUCTURE",
    "SENSE REGULATION",
    "MIND MANAGEMENT",
    "ASSOCIATION ARCHITECTURE",
    "SCRIPTURAL ABSORPTION",
    "FALL-RECOVERY PROTOCOL",
    "STABILITY & HIGHER TASTE",
    "NIṢṬHĀ MAINTENANCE",
    "DIGITAL VISUAL STIMULATION TRAPS",
    "PSYCHOLOGICAL & NEUROCHEMICAL TRAPS",
    "CONSUMERISM & LIFESTYLE TRAPS",
    "WORKPLACE & SOCIAL ENVIRONMENT TRAPS",
    "MEDIA & ENTERTAINMENT TRAPS",
    "PRABHUPĀDA INSTRUCTIONAL QUOTE THEMES",
    "VEDIC / GĪTĀ / UPANIṢADIC INSTRUCTIONS",
    "PURĀṆIC & ITIHĀSA STORIES - Character Case Studies",
    "MODERN REAL-LIFE CASE THEMES"
];

const report = [];

categories.forEach(cat => {
    const catArticles = data.filter(a => a.category === cat);
    const en = catArticles.filter(a => !a.language || a.language === 'en').sort((a,b) => a.order - b.order || a.id - b.id);
    const ta = catArticles.filter(a => a.language === 'ta');

    const mapped = en.map(e => {
        // Find matching Tamil article
        // 1. check slug
        let match = ta.find(t => t.slug === `${e.slug}-ta`);
        if (!match) {
            // 2. check base slug match
            match = ta.find(t => t.slug.replace(/-ta$/, '') === e.slug);
        }
        if (!match) {
            // 3. check by order if the category has order numbers
            match = ta.find(t => t.order === e.order);
        }
        return {
            english: e,
            tamil: match || null
        };
    });

    report.push({
        category: cat,
        articles: mapped
    });
});

// Print summary
console.log('=== TRANSLATION STATUS REPORT ===\n');
report.forEach(catRep => {
    const total = catRep.articles.length;
    const translated = catRep.articles.filter(a => a.tamil !== null).length;
    console.log(`${catRep.category}: ${translated}/${total} translated`);
    
    // Print details of untranslated or translated if requested
    catRep.articles.forEach(art => {
        const status = art.tamil ? `[DONE] (ID: ${art.tamil.id})` : `[MISSING]`;
        console.log(`  - Order ${art.english.order} | Slug: ${art.english.slug} | Status: ${status}`);
    });
    console.log('');
});
