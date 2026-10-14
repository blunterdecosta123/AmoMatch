import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { scrapeLinkedInProfile, scrapeInstagramProfile } from './apifyScraper.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API Health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'AmoMatch Agent Dating Platform',
    apifyConfigured: Boolean(process.env.APIFY_API_TOKEN)
  });
});

// Scrape endpoint
app.post('/api/scrape', async (req, res) => {
  try {
    const { name, linkedinUrl, instagramUrl, apifyToken } = req.body;

    if (!linkedinUrl || !instagramUrl) {
      return res.status(400).json({ error: 'Both LinkedIn and Instagram URLs are required.' });
    }

    console.log(`[Scraper] Scraping for ${name || 'User'}: LI=${linkedinUrl}, IG=${instagramUrl}`);

    const [linkedinData, instagramData] = await Promise.all([
      scrapeLinkedInProfile(linkedinUrl, apifyToken),
      scrapeInstagramProfile(instagramUrl, apifyToken)
    ]);

    res.json({
      success: true,
      linkedinData,
      instagramData
    });
  } catch (error) {
    console.error('[Scraper Error]:', error);
    res.status(500).json({ error: error.message || 'Scraping failed' });
  }
});

// Serve frontend in production
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Fallback handler for client-side SPA routing (Express 5 compatible)
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🚀 AmoMatch Server running on http://localhost:${PORT}`);
  console.log(`📡 Apify Scraper Engine active`);
});
