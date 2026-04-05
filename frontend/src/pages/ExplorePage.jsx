import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Languages, Copy, Share2, BookOpen, Quote } from 'lucide-react';
import { clsx } from 'clsx';

const API_BASE = 'http://localhost:5000/api';

const ExplorePage = () => {
  const [granthas, setGranthas] = useState([]);
  const [activeGrantha, setActiveGrantha] = useState('bhagavad-gita');
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [topics, setTopics] = useState(["karma", "dharma", "moksha", "atman", "duty", "surrender", "peace", "yoga"]);

  useEffect(() => {
    fetchGranthas();
    fetchVerses();
  }, [activeGrantha]);

  const fetchGranthas = async () => {
    try {
      const res = await axios.get(`${API_BASE}/granthas`);
      setGranthas(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchVerses = async (q = '') => {
    setLoading(true);
    try {
      const url = q ? `${API_BASE}/verses?q=${q}` : `${API_BASE}/verses?grantha=${activeGrantha}`;
      const res = await axios.get(url);
      setVerses(res.data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleSearch = () => fetchVerses(searchQuery);

  return (
    <div className="pt-24 pb-16 bg-cream min-h-screen">
      {/* Page Header */}
      <div className="section-header px-8">
        <span className="section-eyebrow">Explore the Sacred Texts</span>
        <h2 className="section-title">Grantha <span className="section-accent">Explorer</span></h2>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="h-px w-12 bg-parchment-deep"></div>
          <span className="text-gold text-lg">🪔</span>
          <div className="h-px w-12 bg-parchment-deep"></div>
        </div>
      </div>

      {/* Grantha Selector */}
      <section className="px-4 md:px-8 mb-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {granthas.map((g) => (
            <motion.div
              key={g.id}
              whileHover={{ y: -4 }}
              onClick={() => setActiveGrantha(g.id)}
              className={clsx(
                "cursor-pointer p-4 md:p-6 text-center border-t-4 transition-all duration-300 card-premium relative overflow-hidden group",
                g.id === activeGrantha ? "border-gold bg-parchment shadow-gold" : "border-saffron bg-white"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-saffron/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-3xl md:text-4xl block mb-2 md:mb-3">{g.emoji}</span>
              <h3 className="font-cinzel font-semibold text-xs md:text-sm text-brown tracking-wider mb-1">{g.name}</h3>
              <p className="text-[0.6rem] md:text-[0.65rem] text-brown/50 tracking-widest uppercase">{g.chapters} chapters · {g.verses.toLocaleString()} verses</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Explorer Layout */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
        {/* Sidebar (Moved above on mobile for quick access) */}
        <aside className="order-1 lg:order-2 flex flex-col gap-6 md:gap-8 lg:sticky lg:top-24">
          {/* Semantic Search */}
          <div className="card-premium p-5 md:p-6">
            <h4 className="font-cinzel font-bold text-[0.7rem] text-brown tracking-widest uppercase mb-4 pb-3 border-b border-parchment-dark flex items-center gap-2">
              <Search className="w-4 h-4 text-saffron" /> Semantic Search
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Karma, duty, peace..."
                className="flex-1 bg-parchment p-2.5 rounded-sm font-merriweather text-sm text-brown border border-parchment-dark focus:bg-white focus:border-saffron outline-none transition-all w-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button onClick={handleSearch} className="bg-saffron text-white p-2.5 rounded-sm hover:bg-saffron-dark transition-colors shrink-0">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Topics */}
          <div className="card-premium p-5 md:p-6">
            <h4 className="font-cinzel font-bold text-[0.7rem] text-brown tracking-widest uppercase mb-4 pb-3 border-b border-parchment-dark flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-saffron" /> Browse by Topic
            </h4>
            <div className="flex flex-wrap gap-2">
              {topics.map(topic => (
                <button
                  key={topic}
                  onClick={() => { setSearchQuery(topic); fetchVerses(topic); }}
                  className="bg-saffron/10 border border-saffron/20 text-saffron-dark text-[0.6rem] md:text-[0.65rem] px-3 py-1.5 rounded-full font-cinzel tracking-wider uppercase hover:bg-saffron/20 transition-all"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main List */}
        <div className="order-2 lg:order-1 flex flex-col gap-6 md:gap-8">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="card-premium p-12 text-center text-brown/50 italic font-merriweather"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-8 h-8 border-2 border-saffron border-t-transparent rounded-full animate-spin"></div>
                </div>
                Consulting the ancient wisdom...
              </motion.div>
            ) : verses.length > 0 ? (
              verses.map((v) => (
                <VerseCard key={v.id} verse={v} />
              ))
            ) : (
              <div className="card-premium p-12 text-center text-brown/50 italic font-merriweather">
                No verses found. Try exploring another Grantha or searching for a common topic.
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

const VerseCard = ({ verse }) => {
  const [showTranslate, setShowTranslate] = useState(false);
  const [translation, setTranslation] = useState(null);
  const [translating, setTranslating] = useState(false);
  const [langs, setLangs] = useState([]);

  useEffect(() => {
    const fetchLangs = async () => {
      try {
        const res = await axios.get(`${API_BASE}/languages`);
        setLangs(res.data);
      } catch (err) { console.error(err); }
    };
    fetchLangs();
  }, []);

  const handleTranslate = async (lang) => {
    setTranslating(true);
    try {
      const res = await axios.post(`${API_BASE}/translate`, { verseId: verse.id, lang });
      setTranslation(res.data.translation || res.data.message);
    } catch (err) { console.error(err); }
    setTranslating(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="card-premium p-8 border-l-4 border-l-saffron hover:border-l-gold hover:translate-x-1 transition-all relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="40" stroke="currentColor" fill="none" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" fill="none" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <span className="bg-parchment border border-parchment-deep text-maroon font-cinzel font-semibold text-[0.65rem] px-3 py-1 tracking-widest uppercase rounded-sm">
          {verse.grantha}
        </span>
        <span className="font-cinzel text-[0.7rem] text-saffron tracking-widest uppercase">
          Chapter {verse.chapter} · Verse {verse.verse}
        </span>
      </div>

      <div className="border-b border-parchment-dark pb-6 mb-6">
        <p className="font-merriweather text-lg md:text-xl text-maroon-dark leading-[1.8] mb-4 whitespace-pre-line">
          {verse.sanskrit}
        </p>
        <p className="text-xs text-brown-light/60 italic tracking-wide font-merriweather">
          {verse.transliteration}
        </p>
      </div>

      <p className="font-merriweather text-brown text-sm leading-relaxed mb-6">
        {verse.translation}
      </p>

      {/* AI Meaning Box */}
      <div className="bg-gradient-to-br from-parchment/60 to-parchment-dark/40 border border-parchment-deep border-l-4 border-l-gold p-5 mb-6 relative group overflow-hidden">
        <Sparkles className="absolute -bottom-2 -right-2 w-12 h-12 text-gold/10 group-hover:scale-125 transition-transform" />
        <span className="font-cinzel font-bold text-[0.6rem] text-saffron tracking-[0.15em] uppercase block mb-2">
          ✦ AI Meaning & Modern Application
        </span>
        <p className="text-brown-light italic text-[0.82rem] leading-relaxed relative z-10">
          {verse.meaning}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {verse.tags.map(tag => (
          <span key={tag} className="bg-saffron/10 border border-saffron/20 text-saffron-dark text-[0.62rem] px-2.5 py-1 rounded-sm font-cinzel tracking-wider uppercase">
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setShowTranslate(!showTranslate)}
          className="flex items-center gap-2 font-cinzel text-[0.65rem] tracking-widest uppercase px-4 py-2 border border-parchment-dark bg-saffron text-white hover:bg-saffron-dark transition-all rounded-sm shadow-sm"
        >
          <Languages className="w-3.5 h-3.5" /> Translate
        </button>
        <Link
          to="/chat"
          className="flex items-center gap-2 font-cinzel text-[0.65rem] tracking-widest uppercase px-4 py-2 border border-parchment-dark hover:bg-parchment transition-all rounded-sm no-underline text-brown"
        >
          <BookOpen className="w-3.5 h-3.5" /> Ask AI
        </Link>
        <button className="flex items-center gap-2 font-cinzel text-[0.65rem] tracking-widest uppercase px-4 py-2 border border-parchment-dark hover:bg-parchment transition-all rounded-sm">
          <Copy className="w-3.5 h-3.5" /> Copy
        </button>
        <button className="flex items-center gap-2 font-cinzel text-[0.65rem] tracking-widest uppercase px-4 py-2 border border-parchment-dark hover:bg-parchment transition-all rounded-sm">
          <Share2 className="w-3.5 h-3.5" /> Share
        </button>
      </div>

      {/* Translation Panel */}
      <AnimatePresence>
        {showTranslate && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-6 overflow-hidden"
          >
            <div className="bg-parchment p-6 border border-parchment-dark border-t-0 rounded-sm">
              <div className="flex flex-wrap gap-2 mb-6">
                {langs.map(l => (
                  <button
                    key={l.code}
                    onClick={() => handleTranslate(l.code)}
                    className="font-merriweather text-[0.72rem] px-4 py-1.5 bg-white border border-parchment-deep rounded-full hover:bg-saffron hover:text-white hover:border-saffron transition-all"
                  >
                    {l.name}
                  </button>
                ))}
              </div>
              <div className="bg-white min-h-[4rem] p-4 border border-parchment-dark rounded-sm flex items-center justify-center">
                {translating ? (
                  <div className="flex items-center gap-3 text-brown/50 italic text-sm">
                    <div className="w-4 h-4 border-2 border-saffron border-t-transparent rounded-full animate-spin"></div>
                    Translating via Sarvam AI...
                  </div>
                ) : translation ? (
                  <p className="text-brown text-sm leading-relaxed text-center w-full">{translation}</p>
                ) : (
                  <p className="text-brown/40 italic text-[0.75rem]">Select a language above to translate this verse.</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExplorePage;
