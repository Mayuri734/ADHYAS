const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const aiSimulator = require('./utils/ai-simulator');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper to read JSON data
const readData = (filename) => {
  const filePath = path.join(__dirname, 'data', `${filename}.json`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const writeData = (filename, data) => {
  const filePath = path.join(__dirname, 'data', `${filename}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// API Routes
app.get('/api/granthas', (req, res) => {
  try {
    const granthas = readData('granthas');
    res.json(granthas);
  } catch (err) {
    res.status(500).json({ error: 'Error loading granthas' });
  }
});

app.get('/api/verses', async (req, res) => {
  try {
    const { grantha, q, chapter, verse } = req.query;

    if (grantha === 'bhagavad-gita') {
      // Real-time Gita API integration
      if (chapter && verse) {
        const response = await axios.get(`https://bhagavadgitaapi.in/slok/${chapter}/${verse}`);
        const data = response.data;
        return res.json([{
          id: `BG-${chapter}-${verse}`,
          grantha: 'Bhagavad Gita',
          chapter: data.chapter,
          verse: data.verse,
          sanskrit: data.slok,
          transliteration: data.transliteration,
          translation: data.tej.ht, // Hindi translation by default
          meaning: data.tej.et, // English meaning
          tags: ['Gita', 'Wisdom']
        }]);
      } else if (chapter) {
        // Fetch whole chapter
        const response = await axios.get(`https://bhagavadgitaapi.in/chapter/${chapter}`);
        const data = response.data;
        return res.json([{
          id: `BG-CH-${chapter}`,
          grantha: 'Bhagavad Gita',
          chapter: data.chapter_number,
          verse: 'Full Chapter',
          sanskrit: data.name,
          transliteration: data.transliteration,
          translation: data.meaning.hi,
          meaning: data.meaning.en,
          tags: ['Gita', 'Summary']
        }]);
      }
    }

    // Fallback to local JSON for others or general search
    let verses = readData('verses');
    if (grantha) verses = verses.filter(v => v.grantha.toLowerCase() === grantha.toLowerCase() || v.granthaId === grantha);
    if (q) {
      const query = q.toLowerCase();
      verses = verses.filter(v =>
        v.translation.toLowerCase().includes(query) ||
        v.meaning.toLowerCase().includes(query) ||
        v.tags.some(t => t.includes(query)) ||
        v.sanskrit.toLowerCase().includes(query)
      );
    }
    res.json(verses);
  } catch (err) {
    console.error('API Fetch Error:', err.message);
    res.status(500).json({ error: 'Error loading verses from external API' });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { query, sessionId } = req.body;
    if (!query || !sessionId) {
      return res.status(400).json({ error: 'Query and sessionId are required' });
    }
    const response = await aiSimulator.getChatResponse(sessionId, query);
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: 'Error processing chat' });
  }
});

app.post('/api/translate', async (req, res) => {
  try {
    const { verseId, lang, content } = req.body;
    if ((!verseId && !content) || !lang) {
      return res.status(400).json({ error: 'VerseId/Content and lang are required' });
    }

    let slokToTranslate = content;
    if (verseId) {
       const verses = readData('verses');
       const verse = verses.find(v => v.id === verseId);
       if (verse) slokToTranslate = verse.sanskrit;
    }

    if (!slokToTranslate) return res.status(404).json({ error: 'Content not found' });

    const sarvamKey = process.env.SARVAM_API_KEY;
    if (!sarvamKey) {
      return res.json({ translation: null, message: "Sarvam AI API Key not configured." });
    }

    const langMap = {
      'en': 'en-IN', 'hi': 'hi-IN', 'mr': 'mr-IN', 'ta': 'ta-IN', 'te': 'te-IN',
      'kn': 'kn-IN', 'gu': 'gu-IN', 'bn': 'bn-IN', 'pa': 'pa-IN', 'ml': 'ml-IN'
    };
    const targetLang = langMap[lang] || `${lang}-IN`;

    const response = await axios.post('https://api.sarvam.ai/translate', {
      input: slokToTranslate,
      source_language_code: "hi-IN",
      target_language_code: targetLang,
      model: "sarvam-translate:v1"
    }, {
      headers: {
        'api-subscription-key': sarvamKey,
        'Content-Type': 'application/json'
      }
    });

    const translatedText = response.data.translated_text || response.data.translatedText;
    res.json({ translation: translatedText, source: 'Sarvam AI' });

  } catch (err) {
    console.error('Sarvam API Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Error processing translation' });
  }
});

app.get('/api/events', (req, res) => {
  try {
    const events = readData('events');
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Error loading events' });
  }
});

app.post('/api/events', (req, res) => {
  try {
    const { title, date, location, desc, emoji } = req.body;
    const events = readData('events');
    const newEvent = { title, date, location, desc, emoji: emoji || '🌸' };
    events.push(newEvent);
    writeData('events', events);
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ error: 'Error creating event' });
  }
});

app.get('/api/languages', (req, res) => {
  try {
    const languages = readData('languages');
    res.json(languages);
  } catch (err) {
    res.status(500).json({ error: 'Error loading languages' });
  }
});

app.listen(PORT, () => {
  console.log(`ADHYAS Backend running on port ${PORT}`);
});
