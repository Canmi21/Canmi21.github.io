import fetch from 'node-fetch';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const CLOUDFLARE_API_URL = 'https://api.cloudflare.com/client/v4/zones';
const CLOUDFLARE_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

async function getCloudflareStats() {
    console.log(`Using Zone ID: ${CLOUDFLARE_ZONE_ID}`);
    console.log(`Fetching data from: ${CLOUDFLARE_API_URL}/${CLOUDFLARE_ZONE_ID}/analytics/dashboard?since=-30d&continuous=true`);

    const response = await fetch(`${CLOUDFLARE_API_URL}/${CLOUDFLARE_ZONE_ID}/analytics/dashboard?since=-30d&continuous=true`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        console.log(`Error fetching data: ${response.statusText}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.result;
}

getCloudflareStats().then(data => {
    const outputDir = '../source/_data';
    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir);
    }
    fs.writeFileSync(`${outputDir}/cloudflare_stats.json`, JSON.stringify(data, null, 2));
    console.log('Cloudflare stats saved to source/_data/cloudflare_stats.json');
}).catch(error => {
    console.error('Error fetching Cloudflare stats:', error);
});
