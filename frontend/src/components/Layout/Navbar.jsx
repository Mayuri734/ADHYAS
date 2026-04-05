import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'ADHYAS Guru', path: '/chat' },
    { name: 'Events', path: '/events' },
  ];

  return (
    <>
      <nav className={clsx(
        "fixed top-0 left-0 right-0 z-[100] h-16 flex items-center justify-between px-6 md:px-8 border-b transition-all duration-300",
        isScrolled || isMenuOpen
          ? "bg-ink/97 backdrop-blur-md border-gold/30 shadow-lg"
          : "bg-transparent border-transparent"
      )}>
        <NavLink to="/" className="flex items-center gap-2.5 no-underline group" onClick={() => setIsMenuOpen(false)}>
          <span className="text-2xl text-gold group-hover:drop-shadow-[0_0_8px_rgba(201,162,39,0.5)] transition-all animate-pulse-gold font-serif">
            ॐ
          </span>
          <div className="flex flex-col">
            <span className="font-cinzel font-bold text-lg md:text-xl text-gold tracking-wider uppercase">
              ADHYAS
            </span>
            <span className="text-[0.45rem] md:text-[0.55rem] text-saffron-light tracking-[0.15em] uppercase -mt-0.5">
              Grantha Intelligence
            </span>
          </div>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => clsx(
                    "font-cinzel text-[0.78rem] font-semibold uppercase tracking-[0.08em] no-underline transition-all relative pb-0.5",
                    "after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-full after:h-[1px] after:bg-gold after:transition-[right] after:duration-300",
                    "hover:text-gold hover:after:right-0",
                    isActive ? "text-saffron-light after:right-0" : "text-parchment/80"
                  )}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <NavLink to="/explore" className="btn-primary !py-2 !px-5 !text-[0.7rem] no-underline">
            Begin Journey
          </NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-gold text-2xl p-1 focus:outline-none z-[110]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div className={clsx(
        "fixed inset-0 bg-ink/95 backdrop-blur-lg z-[105] md:hidden transition-all duration-500 flex flex-col items-center justify-center gap-8",
        isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      )}>
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => clsx(
              "font-cinzel text-xl font-bold uppercase tracking-widest no-underline transition-all",
              isActive ? "text-saffron-light" : "text-parchment/70 hover:text-gold"
            )}
          >
            {link.name}
          </NavLink>
        ))}
        <NavLink 
          to="/explore" 
          onClick={() => setIsMenuOpen(false)}
          className="btn-primary !px-10 !py-4 !text-sm mt-4 no-underline"
        >
          Begin Journey
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;
