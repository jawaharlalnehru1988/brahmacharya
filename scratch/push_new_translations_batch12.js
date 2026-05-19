const fs = require('fs');

async function pushNewTranslations() {
    const articles = [
        'walking-japa-vs-sitting-japa-ta.json',
        'dress-code-modesty-brahmacharya-ta.json',
        'fashion-influencer-culture-illusion-aesthetic-purity-ta.json',
        'fan-fiction-communities-traps-ta.json',
        'late-night-work-isolation-traps-ta.json'
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
