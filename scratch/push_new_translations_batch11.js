const fs = require('fs');

async function pushNewTranslations() {
    const articles = [
        'preparing-for-preaching-self-purification-ta.json',
        'transforming-sexual-energy-ojas-ta.json',
        'preventing-binge-cycle-relapse-ta.json',
        'evening-reflection-journaling-for-brahmacharis-ta.json',
        'digital-fasting-tactics-ta.json'
    ];

    for (const file of articles) {
        if (!fs.existsSync(file)) {
            console.warn(`File not found: ${file}`);
            continue;
        }

        const payload = JSON.parse(fs.readFileSync(file, 'utf8'));
        console.log(`Pushing Article: "${payload.title}"...`);

        try {
            const response = await fetch('https://api.askharekrishna.com/api/v1/brahmhacarya/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const result = await response.json();
                console.log(`Successfully pushed "${payload.title}". ID: ${result.id}`);
            } else {
                const errorText = await response.text();
                console.error(`Failed to push "${payload.title}": ${response.status} ${errorText}`);
            }
        } catch (err) {
            console.error(`Error pushing "${payload.title}":`, err);
        }
    }
}

pushNewTranslations();
