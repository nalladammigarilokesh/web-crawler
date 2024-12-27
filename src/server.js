const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/search', async (req, res) => {
    const { query } = req?.query; 
    if (!query) return res.status(400).json({ error: "Query parameter is required" });

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`https://www.google.com/search?q=${query}`);

        const links = await page.evaluate(() =>
            Array.from(document.querySelectorAll('a'))
                .map(link => link.href)
                .filter(href => href.startsWith('http'))
        );
        await browser.close();
        res.json({ links });
    } catch (error) {
        console.error("Error scraping Google:", error);
        res.status(500).json({ error: "An error occurred while searching" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
