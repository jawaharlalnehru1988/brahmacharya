const fs = require('fs');

const data = JSON.parse(fs.readFileSync('api_response.json', 'utf8'));

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

categories.forEach(cat => {
    const catArticles = data.filter(a => a.category === cat);
    const en = catArticles.filter(a => !a.language || a.language === 'en').sort((a,b) => a.order - b.order || a.id - b.id);
    const ta = catArticles.filter(a => a.language === 'ta');

    const missing = [];
    en.forEach(e => {
        let match = ta.find(t => t.slug === `${e.slug}-ta`);
        if (!match) match = ta.find(t => t.slug.replace(/-ta$/, '') === e.slug);
        if (!match) match = ta.find(t => t.order === e.order);
        if (!match) {
            missing.push(e);
        }
    });

    console.log(`${cat}: ${en.length - missing.length}/${en.length} translated. ${missing.length} missing.`);
    if (missing.length > 0) {
        console.log(`  Next to translate: ID: ${missing[0].id} | Order: ${missing[0].order} | Slug: ${missing[0].slug} | Title: "${missing[0].title}"`);
    }
});
