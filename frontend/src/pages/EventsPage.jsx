import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Plus, X, Check, Bell, Info } from 'lucide-react';
import { clsx } from 'clsx';

const API_BASE = 'http://localhost:5000/api';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', date: '', location: '', desc: '' });
  const [rsvpSet, setRsvpSet] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/events`);
      setEvents(res.data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date) return;
    try {
      await axios.post(`${API_BASE}/events`, formData);
      setShowForm(false);
      setFormData({ title: '', date: '', location: '', desc: '' });
      fetchEvents();
    } catch (err) { console.error(err); }
  };

  const toggleRsvp = (idx) => {
    const newSet = new Set(rsvpSet);
    if (newSet.has(idx)) newSet.delete(idx);
    else newSet.add(idx);
    setRsvpSet(newSet);
  };

  return (
    <div className="pt-24 pb-16 bg-cream min-h-screen">
      <div className="section-header px-8">
        <span className="section-eyebrow">Community & Sangha</span>
        <h2 className="section-title">Cultural <span className="section-accent">Events</span></h2>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="h-px w-12 bg-parchment-deep"></div>
          <span className="text-gold text-lg">🎪</span>
          <div className="h-px w-12 bg-parchment-deep"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {loading ? (
          <div className="text-center p-12 text-brown/40 italic font-merriweather">
            Gathering the assembly...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {events.map((event, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="card-premium p-6 md:p-8 border-t-4 border-t-gold bg-white relative group"
              >
                <div className="font-cinzel text-[0.68rem] text-saffron tracking-[0.12em] uppercase bd-b border-parchment-dark/30 pb-3 mb-4 flex items-center gap-2">
                  <span className="text-lg">{event.emoji || '🌸'}</span> {event.date}
                </div>
                <h3 className="font-playfair text-xl font-bold text-brown mb-3 tracking-tight">{event.title}</h3>
                <p className="text-sm text-brown/60 leading-relaxed font-merriweather mb-6 line-clamp-3">
                  {event.desc}
                </p>
                <div className="flex flex-wrap justify-between items-center gap-4 pt-4 border-t border-parchment-dark/20">
                  <span className="flex items-center gap-2 text-[0.7rem] text-brown-light font-merriweather">
                    <MapPin className="w-3.5 h-3.5 text-saffron" /> {event.location}
                  </span>
                  <button
                    onClick={() => toggleRsvp(idx)}
                    className={clsx(
                      "font-cinzel text-[0.65rem] tracking-widest uppercase px-4 py-2 border transition-all rounded-sm",
                      rsvpSet.has(idx)
                        ? "bg-saffron text-white border-saffron"
                        : "bg-transparent border-saffron text-saffron hover:bg-saffron hover:text-white"
                    )}
                  >
                    {rsvpSet.has(idx) ? (<span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> RSVP'd</span>) : "RSVP"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary flex items-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" /> host an Event
          </button>
        </div>

        {/* Create Event Modal / Form Area */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-12 max-w-2xl mx-auto"
            >
              <div className="card-premium p-8 bg-white border-t-4 border-t-saffron">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-cinzel text-lg font-bold text-brown tracking-widest flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-saffron" /> Create New Event
                  </h3>
                  <X className="w-6 h-6 text-brown/30 cursor-pointer hover:text-saffron transition-colors" onClick={() => setShowForm(false)} />
                </div>
                <form onSubmit={handleCreate} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.65rem] font-cinzel text-brown/60 tracking-widest uppercase">Event Title</label>
                      <input
                        className="bg-parchment/40 border border-parchment-dark p-3 rounded-sm font-merriweather text-sm focus:bg-white focus:border-saffron outline-none"
                        placeholder="e.g. Gita Satsang"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.65rem] font-cinzel text-brown/60 tracking-widest uppercase">Date</label>
                      <input
                        type="date"
                        className="bg-parchment/40 border border-parchment-dark p-3 rounded-sm font-merriweather text-sm focus:bg-white focus:border-saffron outline-none"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.65rem] font-cinzel text-brown/60 tracking-widest uppercase">Location / Online Link</label>
                    <input
                      className="bg-parchment/40 border border-parchment-dark p-3 rounded-sm font-merriweather text-sm focus:bg-white focus:border-saffron outline-none"
                      placeholder="e.g. Online Zoom / Iskcon Temple"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.65rem] font-cinzel text-brown/60 tracking-widest uppercase">Description</label>
                    <textarea
                      className="bg-parchment/40 border border-parchment-dark p-3 rounded-sm font-merriweather text-sm focus:bg-white focus:border-saffron outline-none h-32 resize-none"
                      placeholder="Share details about the gathering..."
                      value={formData.desc}
                      onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="flex justify-end gap-4 mt-2">
                    <button type="button" onClick={() => setShowForm(false)} className="btn-ghost !text-brown-light !border-brown/20 hover:!bg-brown/5">Cancel</button>
                    <button type="submit" className="btn-primary px-10">Create Event ✦</button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-16 flex flex-col md:flex-row gap-8 opacity-70 border-t border-parchment-deep/20 pt-10">
          <div className="flex-1 flex gap-4 items-start">
            <Bell className="w-6 h-6 text-gold mt-1 shrink-0" />
            <div>
              <h4 className="font-cinzel font-bold text-xs text-brown tracking-widest uppercase mb-1">Stay Notified</h4>
              <p className="text-[0.72rem] text-brown-light font-merriweather leading-relaxed">Join the ADHYAS community to receive reminders for upcoming satsangs and cultural workshops in your city.</p>
            </div>
          </div>
          <div className="flex-1 flex gap-4 items-start">
            <Info className="w-6 h-6 text-saffron mt-1 shrink-0" />
            <div>
              <h4 className="font-cinzel font-bold text-xs text-brown tracking-widest uppercase mb-1">Cultural Integrity</h4>
              <p className="text-[0.72rem] text-brown-light font-merriweather leading-relaxed">All hosted events are moderated to ensure they align with the deep philosophical values of Indian scriptures.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
