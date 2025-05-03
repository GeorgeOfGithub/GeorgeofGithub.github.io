const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors'); // Import the cors package

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for all routes

app.get('/daily-word', async (req, res) => {
    try {
        const response = await axios.get('https://ordnet.dk/ddo');
        const $ = cheerio.load(response.data);

        // Extract the word (you'll need to inspect the HTML structure of the page)
        const word = $('.match').text().trim(); // Use .text() instead of .textContent
        res.json({ word });
    } catch (error) {
        console.error('Error fetching the word:', error);
        res.status(500).json({ error: 'Failed to fetch the word' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});