import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-28 pb-16 px-6 md:px-8 flex flex-col items-center justify-center text-center overflow-hidden bg-[#0E0704]">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(224,122,47,0.12)_0%,transparent_60%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(109,31,31,0.15)_0%,transparent_50%)] pointer-events-none"></div>

      {/* Mandala SVG with motion */}
      <motion.svg
        viewBox="0 0 400 400"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] md:w-[700px] h-[120vw] md:h-[700px] opacity-[0.04] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        fill="none"
        stroke="#C9A227"
        strokeWidth="0.6"
      >
        <circle cx="200" cy="200" r="180" />
        <circle cx="200" cy="200" r="150" />
        <circle cx="200" cy="200" r="120" />
        <circle cx="200" cy="200" r="90" />
        <circle cx="200" cy="200" r="60" />
        <line x1="200" y1="20" x2="200" y2="380" />
        <line x1="20" y1="200" x2="380" y2="200" />
        <line x1="74" y1="74" x2="326" y2="326" />
        <line x1="326" y1="74" x2="74" y2="326" />
        <line x1="200" y1="20" x2="326" y2="74" />
        <line x1="326" y1="74" x2="380" y2="200" />
        <line x1="380" y1="200" x2="326" y2="326" />
        <line x1="326" y1="326" x2="200" y2="380" />
        <line x1="200" y1="380" x2="74" y2="326" />
        <line x1="74" y1="326" x2="20" y2="200" />
        <line x1="20" y1="200" x2="74" y2="74" />
        <line x1="74" y1="74" x2="200" y2="20" />
        <polygon points="200,50 230,140 320,140 250,190 275,280 200,230 125,280 150,190 80,140 170,140" stroke="#C9A227" strokeWidth="0.4" />
      </motion.svg>

      {/* Hero Content */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-cinzel-decorative text-5xl md:text-8xl font-bold mb-4 tracking-tight leading-none"
      >
        <span className="text-gold selection:bg-gold/30 line-clamp-1">ADHYAS</span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="font-cinzel text-sm md:text-xl text-saffron-light tracking-[0.15em] mb-10 px-4"
      >
        Indian Grantha Intelligence Platform
      </motion.p>

      {/* Divider */}
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="flex items-center gap-4 mb-10 w-full max-w-[200px] md:max-w-xs"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
        <span className="text-gold text-lg">❧</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gold to-transparent"></div>
      </motion.div>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-xl mx-auto mb-12 px-6"
      >
        <p className="font-merriweather italic text-parchment/70 text-sm md:text-lg leading-loose mb-3">
          "यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः।<br/>
          तत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम॥"
        </p>
        <cite className="font-cinzel text-xs md:text-sm text-saffron uppercase tracking-widest block not-italic">
          — Bhagavad Gita 18.78
        </cite>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-wrap gap-4 justify-center px-4"
      >
        <Link to="/explore" className="btn-primary flex items-center gap-2 group no-underline inline-block">
          Explore Wisdom <span className="group-hover:translate-x-1 transition-transform inline-block">✦</span>
        </Link>
        <Link to="/chat" className="btn-ghost no-underline inline-block">
          Ask the ADHYAS Guru
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="flex flex-wrap justify-center gap-8 md:gap-16 mt-20"
      >
        {[
          { num: "5+", label: "Sacred Texts" },
          { num: "125K+", label: "Verses" },
          { num: "10", label: "Languages" },
          { num: "AI", label: "Powered" }
        ].map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center min-w-[80px]">
            <span className="font-cinzel text-xl md:text-3xl font-bold text-gold mb-1">
              {stat.num}
            </span>
            <span className="text-[0.55rem] md:text-[0.65rem] text-parchment/50 tracking-widest uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
