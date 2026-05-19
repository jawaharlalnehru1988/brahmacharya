const fs = require('fs');

/**
 * Utility script to push article JSON payloads to the API database.
 * Customize the `articles` array with the file paths of the articles to upload.
 */
async function pushArticles() {
    const articles = [
        'emotional-numbing-via-content-ta.json' // Example article
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

pushArticles();
