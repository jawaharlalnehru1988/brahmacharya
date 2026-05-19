const fs = require('fs');

async function pushNewTranslations() {
    const articles = [
        'anime-fan-service-exposure-subtle-seed-lust-ta.json',
        'erotic-literature-subtle-traps-ta.json',
        'workplace-stress-escapism-trap-ta.json',
        'luxury-lifestyle-aspiration-trap-ta.json',
        'idle-time-content-consumption-boredom-ta.json'
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
