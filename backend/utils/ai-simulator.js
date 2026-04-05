const verses = require('../data/verses.json');

const CHAT_RESPONSES = {
  fear: "The Bhagavad Gita addresses fear extensively. In Chapter 2, Verse 47, Krishna teaches that fear arises from attachment to outcomes. When we perform our duties without clinging to results, fear dissolves. 'Do your duty; do not fear' is the eternal teaching. The soul (Atman) is described as 'unborn, eternal, never-changing' — and what is eternal need not fear anything.",
  dharma: "Dharma is one of the most profound concepts in Hindu philosophy. The Gita teaches it as your righteous duty based on your nature (svadharma). In Chapter 18.66, Krishna urges surrender to Divine will as the highest dharma. The Rigveda describes dharma as the cosmic order (rita) that sustains all existence. Your dharma is not just moral law — it is your purpose, your calling.",
  stress: "The Gita is perhaps the world's oldest stress management guide. Chapter 2.14 teaches that sensory discomforts are 'fleeting' — they come and go. The practice of nishkama karma (desireless action) is the antidote. When you act from duty rather than anxiety about results, stress naturally dissolves. The Upanishads add: 'Tat tvam asi' — you are That. The one who is That has nothing to fear.",
  karma: "Karma means action and its consequences — a cosmic law of cause and effect. The Bhagavad Gita distinguishes three types: karma (neutral action), vikarma (wrong action), and akarma (inaction/detached action). The highest karma yoga is acting in accordance with dharma, without ego or attachment. The Rigveda traces karma to cosmic Yajna — the universe itself is a great sacrifice.",
  success: "The Gita redefines success: 'Yoga karmasu kaushalam' (Chapter 2.50) — yoga is excellence in action. True success is not measured by results, but by the quality of your effort and intent. Chapter 18 describes the stages of consciousness — from tamas to rajas to sattva — and says sattvic action, done with clarity and dedication, brings both worldly success and spiritual progress.",
};

class AISimulator {
  constructor() {
    this.memory = new Map(); // Session-based memory
  }

  async getChatResponse(sessionId, query) {
    const history = this.memory.get(sessionId) || [];
    const ql = query.toLowerCase();

    // Basic Context Awareness
    const lastQuery = history.length > 0 ? history[history.length - 1].query.toLowerCase() : '';
    
    let response = "The Granthas hold deep wisdom on this. Every sincere question is a form of tapasya (discipline). Krishna says in Gita 4.34: 'Approach a wise teacher, serve them with humility, and inquire from them sincerely.' This platform connects you to thousands of verses — use the Semantic Search to discover relevant teachings.";

    // Contextual matching: if user says "How to apply it?" and last query was about Karma
    if ((ql.includes("apply") || ql.includes("career") || ql.includes("life")) && lastQuery.includes("karma")) {
      response = "In your career or daily life, applying Karma Yoga means focusing entirely on the process of your work rather than the promotion or paycheck. When you work with excellence (Kaushalam) as an offering, the stress of comparison vanishes. This is the 'skill in action' Krishna speaks of.";
    } else if ((ql.includes("apply") || ql.includes("practice")) && lastQuery.includes("dharma")) {
      response = "Practicing Dharma in modern times means aligning your professional life with your inner nature. If your work serves the greater good and utilizes your unique talents, you are following Svadharma. It is the path of integrity over convenience.";
    } else {
      // Keyword matching
      for (const [key, val] of Object.entries(CHAT_RESPONSES)) {
        if (ql.includes(key)) {
          response = val;
          break;
        }
      }
    }

    // Save to memory
    history.push({ query, response });
    this.memory.set(sessionId, history);

    return {
      message: response,
      sources: ["Bhagavad Gita", "Rigveda", "Upanishads"],
      history: history.slice(-5) // Return last 5 exchanges
    };
  }

  async getSemanticSearch(query) {
    const ql = query.toLowerCase();
    return verses.filter(v => 
      v.translation.toLowerCase().includes(ql) || 
      v.meaning.toLowerCase().includes(ql) || 
      v.tags.some(t => t.includes(ql))
    ).slice(0, 5);
  }
}

module.exports = new AISimulator();
