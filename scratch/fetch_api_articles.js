const fs = require('fs');

async function fetchArticles() {
    try {
        const response = await fetch('https://api.askharekrishna.com/api/v1/brahmhacarya/?limit=200');
        if (response.ok) {
            const data = await response.json();
            console.log('Fetched from API successfully.');
            console.log('Data type:', typeof data);
            if (Array.isArray(data)) {
                console.log(`Fetched array of length: ${data.length}`);
                fs.writeFileSync('scratch/fetched_api_response.json', JSON.stringify(data, null, 2));
            } else if (data.results && Array.isArray(data.results)) {
                console.log(`Fetched results array of length: ${data.results.length}`);
                console.log(`Total count in results: ${data.count}`);
                fs.writeFileSync('scratch/fetched_api_response.json', JSON.stringify(data.results, null, 2));
            } else {
                console.log('Keys of response:', Object.keys(data));
                fs.writeFileSync('scratch/fetched_api_response.json', JSON.stringify(data, null, 2));
            }
        } else {
            console.error(`Failed to fetch: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error(text);
        }
    } catch (err) {
        console.error('Error fetching articles:', err);
    }
}

fetchArticles();
