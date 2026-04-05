import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, MessageCircle, Info, History, Trash2 } from 'lucide-react';
import { clsx } from 'clsx';

const API_BASE = 'http://localhost:5000/api';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      text: 'Namaste 🙏 I am your guide to the wisdom of the Hindu Granthas. Ask me anything — about dharma, karma, the nature of the self, or how ancient teachings apply to modern life.',
      sender: 'ADHYAS Guru',
      sources: ['✦ Ready to explore all sacred texts']
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    const q = input.trim();
    if (!q || loading) return;

    const userMsg = { type: 'user', text: q, sender: 'You' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/chat`, { query: q, sessionId });
      const aiMsg = {
        type: 'ai',
        text: res.data.message,
        sender: 'ADHYAS Guru',
        sources: res.data.sources
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        type: 'ai',
        text: 'Forgive me, but I have trouble connecting to the ancient scrolls right now.',
        sender: 'ADHYAS Guru'
      }]);
    }
    setLoading(false);
  };

  const suggestions = [
    { text: "What does the Gita say about overcoming fear?", label: "Overcoming Fear" },
    { text: "Explain the concept of dharma in daily life", label: "Meaning of Dharma" },
    { text: "How to deal with stress according to scriptures?", label: "Stress Relief" },
    { text: "What is the meaning of karma and success?", label: "Karma & Success" },
  ];

  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-parchment to-parchment-dark min-h-screen">
      <div className="section-header px-8">
        <span className="section-eyebrow">ADHYAS Guru</span>
        <h2 className="section-title">Ask the <span className="section-accent">Granthas</span></h2>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="h-px w-12 bg-parchment-deep"></div>
          <span className="text-gold text-lg">🤖</span>
          <div className="h-px w-12 bg-parchment-deep"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="card-premium h-[500px] md:h-[600px] flex flex-col bg-white overflow-hidden shadow-2xl relative">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-brown/95 to-maroon-dark/95 p-4 md:p-6 flex items-center gap-4 border-b border-gold/30">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold text-xl md:text-2xl border border-gold/30">
              🕉️
            </div>
            <div>
              <h3 className="font-cinzel text-base md:text-lg font-bold text-gold tracking-widest leading-none text-left">ADHYAS Guru</h3>
            </div>
            <div className="ml-auto flex gap-3 text-gold/60">
              <History className="w-5 h-5 hover:text-gold cursor-pointer transition-colors" />
              <Trash2
                className="w-5 h-5 hover:text-red-400 cursor-pointer transition-colors"
                onClick={() => setMessages(messages.slice(0, 1))}
              />
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 bg-cream/50">
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={clsx(
                    "max-w-[90%] md:max-w-[80%] p-4 md:p-5 rounded-sm shadow-sm relative group transition-all",
                    msg.type === 'ai'
                      ? "bg-white border border-parchment-dark border-l-4 border-l-saffron self-start text-brown"
                      : "bg-gradient-to-br from-saffron to-saffron-dark text-white self-end shadow-saffron/20"
                  )}
                >
                  <span className={clsx(
                    "font-cinzel font-bold text-[0.6rem] tracking-[0.15em] uppercase block mb-2",
                    msg.type === 'ai' ? "text-saffron" : "text-white/60"
                  )}>
                    {msg.sender}
                  </span>
                  <p className="text-sm md:text-[0.92rem] leading-[1.7] md:leading-[1.8] font-merriweather whitespace-pre-wrap">
                    {msg.text}
                  </p>
                  {msg.sources && (
                    <div className="mt-4 pt-3 border-t border-parchment-dark/30 flex flex-wrap gap-2">
                      {msg.sources.map((s, i) => (
                        <span key={i} className="text-[0.6rem] md:text-[0.65rem] font-cinzel text-saffron tracking-wider uppercase bg-parchment/50 px-2 md:px-2.5 py-1 flex items-center gap-1.5 rounded-sm">
                          <Sparkles className="w-3 h-3" /> {s}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="self-start bg-white border border-parchment-dark border-l-4 border-l-gold p-4 md:p-5 rounded-sm shadow-sm flex items-center gap-3 text-brown/50 italic text-sm font-merriweather"
              >
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
                Consulting the ancient scrolls...
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Suggestions */}
          <div className="px-4 md:px-6 py-3 bg-white flex flex-wrap gap-2 border-t border-parchment-dark/20 max-h-[120px] overflow-y-auto">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => setInput(s.text)}
                className="text-[0.65rem] md:text-[0.68rem] font-merriweather italic text-brown-light px-3 py-1.5 bg-parchment/40 border border-parchment-dark/30 rounded-full hover:bg-saffron/10 hover:border-saffron transition-all whitespace-nowrap"
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* User Input Area */}
          <div className="p-4 md:p-6 bg-white border-t border-parchment-dark flex gap-3 md:gap-4 items-end shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
            <textarea
              placeholder="Ask a question from the Granthas..."
              className="flex-1 bg-parchment p-3 rounded-sm font-merriweather text-sm text-brown border border-parchment-dark focus:bg-white focus:border-saffron outline-none transition-all resize-none max-h-32"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="group bg-gradient-to-br from-saffron to-saffron-dark text-white p-3 rounded-sm shadow-[0_4px_12px_rgba(224,122,47,0.3)] hover:shadow-[0_8px_20px_rgba(224,122,47,0.4)] disabled:opacity-50 disabled:grayscale transition-all"
            >
              <Send className="w-6 h-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-80">
          <div className="flex gap-4 items-start card-premium p-5 bg-white/50 backdrop-blur-sm shadow-none">
            <Sparkles className="w-6 h-6 text-gold mt-1 shrink-0" />
            <div>
              <h4 className="font-cinzel font-bold text-xs text-brown tracking-widest uppercase mb-1">Contextual Memory</h4>
              <p className="text-[0.72rem] text-brown-light leading-relaxed">The Guru remembers your previous questions to provide coherent philosophical guidance.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start card-premium p-5 bg-white/50 backdrop-blur-sm shadow-none">
            <Info className="w-6 h-6 text-saffron mt-1 shrink-0" />
            <div>
              <h4 className="font-cinzel font-bold text-xs text-brown tracking-widest uppercase mb-1">Source Verification</h4>
              <p className="text-[0.72rem] text-brown-light leading-relaxed">Every insight is linked to validated verses from the Gita, Vedas, and Upanishads.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
