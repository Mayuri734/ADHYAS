import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-ink py-12 px-8 text-center border-t border-gold/20">
      <div className="flex flex-col items-center">
        <span className="text-4xl text-gold mb-2 drop-shadow-md">
          ॐ
        </span>
        <h3 className="font-cinzel text-lg font-bold text-gold tracking-widest mb-1">
          Adhyas — Grantha Intelligence Platform
        </h3>
        <p className="text-[0.75rem] text-parchment/40 tracking-widest uppercase mb-6 max-w-lg leading-relaxed">
          Bridging ancient wisdom with modern technology · Built with reverence for Sanātana Dharma
        </p>

        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-6"></div>

      </div>
    </footer>
  );
};

export default Footer;
