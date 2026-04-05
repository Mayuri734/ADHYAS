import React from 'react';
import { BookOpen, Languages, Sparkles, Search, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturesStrip = () => {
  const features = [
    { 
      icon: <BookOpen className="w-8 h-8 text-gold" />, 
      title: "Grantha Explorer", 
      desc: "Browse verses from Bhagavad Gita, Vedas, & Upanishads with original Sanskrit." 
    },
    { 
      icon: <Languages className="w-8 h-8 text-gold" />, 
      title: "Multi-Language", 
      desc: "Translate any verse into 10 Indian languages in real-time via Sarvam AI." 
    },
    { 
      icon: <Sparkles className="w-8 h-8 text-gold" />, 
      title: "AI Meaning Engine", 
      desc: "Get simple explanations and modern life interpretations powered by LLM." 
    },
    { 
      icon: <Search className="w-8 h-8 text-gold" />, 
      title: "Semantic Search", 
      desc: "Search concepts like 'karma' or 'peace' and discover relevant verses via RAG." 
    },
    { 
      icon: <MessageSquare className="w-8 h-8 text-gold" />, 
      title: "AI Chat Guide", 
      desc: "Ask any question and receive scripture-backed answers from your AI Guru." 
    }
  ];

  return (
    <section className="bg-brown py-16 px-8 relative overflow-hidden">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' /%3E%3C/svg%3E")' }}></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 relative z-10">
        {features.map((f, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center group"
          >
            <div className="mb-6 p-4 rounded-full bg-gold/5 border border-gold/10 group-hover:bg-gold/10 group-hover:border-gold/30 group-hover:scale-110 transition-all duration-300">
              {f.icon}
            </div>
            <h3 className="font-cinzel text-xs md:text-sm font-bold text-gold tracking-[0.15em] uppercase mb-3">
              {f.title}
            </h3>
            <p className="font-merriweather text-[0.78rem] text-parchment/60 leading-relaxed max-w-[200px]">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesStrip;
