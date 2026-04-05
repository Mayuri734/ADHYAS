import React from 'react';
import Hero from '../components/Home/Hero';
import FeaturesStrip from '../components/Home/FeaturesStrip';
import { motion } from 'framer-motion';
import { ArrowRight, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-cream overflow-hidden">
      <Hero />
      <FeaturesStrip />
      
      {/* Daily Wisdom Section */}
      <section className="py-24 px-8 bg-parchment relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="card-premium p-12 bg-white border-t-8 border-t-gold relative group"
          >
            <Quote className="absolute top-8 left-8 w-16 h-16 text-gold/10 -rotate-12 group-hover:scale-110 transition-transform" />
            <span className="section-eyebrow mb-6">Daily Wisdom</span>
            <div className="mb-8">
              <p className="font-merriweather text-2xl md:text-3xl text-maroon-dark leading-relaxed mb-6 font-bold">
                "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।<br/>
                अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥"
              </p>
              <p className="font-merriweather italic text-brown text-base md:text-xl leading-relaxed max-w-2xl mx-auto">
                "Whenever and wherever there is a decline in righteousness, O Arjuna, at that time I manifest myself on earth."
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <span className="font-cinzel text-sm text-saffron tracking-[0.2em] uppercase font-bold">
                — Bhagavad Gita 4.7
              </span>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
              <p className="text-sm text-brown/60 max-w-lg mx-auto font-merriweather leading-loose">
                The Divine reappears in every age to restore balance. This gives us assurance that the universe has a self-correcting, purposeful nature.
              </p>
            </div>
            
            <div className="mt-12 flex justify-center gap-6">
              <Link to="/explore" className="btn-primary flex items-center gap-3 group">
                Explore More Verses <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 bg-ink text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,162,39,0.05),transparent)] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-cinzel text-3xl md:text-5xl font-bold text-gold mb-6 tracking-widest uppercase">
            Ready to Begin Your Journey?
          </h2>
          <p className="font-merriweather text-parchment/60 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Experience the profound depth of Indian Granthas with the clarity of modern intelligence. Start your spiritual inquiry today.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/chat" className="btn-primary !px-12 !py-4 text-base">
              Talk to ADHYAS Guru
            </Link>
            <Link to="/explore" className="btn-ghost !px-12 !py-4 text-base !border-gold/30 hover:!border-gold">
              Browse Granthas
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
