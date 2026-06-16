import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiShield, FiStar, FiUsers, FiClock, FiSmile } from 'react-icons/fi';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const CATEGORIES = [
  { name: 'Maid', icon: '🧹', color: 'from-pink-400 to-rose-500' },
  { name: 'Cook', icon: '👩‍🍳', color: 'from-orange-400 to-amber-500' },
  { name: 'Nurse', icon: '👩‍⚕️', color: 'from-blue-400 to-cyan-500' },
  { name: 'Babysitter', icon: '👶', color: 'from-yellow-400 to-orange-400' },
  { name: 'Caretaker', icon: '🤝', color: 'from-green-400 to-emerald-500' },
  { name: 'Driver', icon: '🚗', color: 'from-gray-500 to-slate-600' },
  { name: 'Gardener', icon: '🌿', color: 'from-emerald-400 to-teal-500' },
  { name: 'Elderly Care', icon: '💙', color: 'from-teal-400 to-cyan-500' },
];

const WHY_US = [
  { icon: <FiShield size={24} />, title: 'Verified Workers', desc: 'All workers undergo background checks and ID verification.' },
  { icon: <FiStar size={24} />, title: 'Top Rated', desc: 'Real reviews and ratings from verified customers.' },
  { icon: <FiClock size={24} />, title: '24×7 Support', desc: 'Our team is always available to help you.' },
  { icon: <FiSmile size={24} />, title: 'Affordable', desc: 'Transparent pricing with no hidden charges.' },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', role: 'Working Mother', text: 'Found an amazing cook in just 10 minutes. The quality of service is excellent!', rating: 5 },
  { name: 'Ramesh Gupta', role: 'Retired Professional', text: 'The caretaker for my mother is incredibly professional and kind.', rating: 5 },
  { name: 'Anita Patel', role: 'Business Owner', text: 'Our maid has been with us for 6 months now. Couldn\'t be happier!', rating: 4 },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Landing = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${search}`);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-accent-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              🏠 Trusted by 10,000+ families
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Find Trusted Maids, Cooks,{' '}
              <span className="text-yellow-300">Nurses</span> & Home Helpers Near You
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-xl mx-auto">
              Verified professionals. Transparent pricing. Book in minutes.
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for maid, cook, nurse..."
                  className="w-full pl-11 pr-4 py-4 rounded-2xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <button type="submit" className="bg-white text-primary-700 font-bold px-8 py-4 rounded-2xl hover:bg-gray-50 transition-colors whitespace-nowrap shadow-lg">
                Find Helpers
              </button>
            </form>

            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-white/70">
              <span className="flex items-center gap-1.5"><FiUsers size={14} /> 500+ Workers</span>
              <span className="flex items-center gap-1.5"><FiStar size={14} /> 4.8 Avg Rating</span>
              <span className="flex items-center gap-1.5"><FiShield size={14} /> 100% Verified</span>
            </div>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-heading mb-3">What Are You Looking For?</h2>
            <p className="text-gray-500">Choose from our wide range of home help services</p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <motion.button key={cat.name} variants={fadeUp}
                onClick={() => navigate(`/search?category=${cat.name.toLowerCase().replace(' ', '-')}`)}
                className="group flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-transparent hover:border-primary-200 hover:bg-primary-50 transition-all duration-200">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <span className="font-semibold text-gray-700 text-sm">{cat.name}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-heading mb-3">Why Choose Us?</h2>
            <p className="text-gray-500">We're committed to making home services stress-free</p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item) => (
              <motion.div key={item.title} variants={fadeUp} className="card text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-heading mb-3">What Our Customers Say</h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <motion.div key={t.name} variants={fadeUp} className="card border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FiStar key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-500 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Perfect Helper?</h2>
            <p className="text-white/80 mb-8">Join thousands of families who trust House Help Connect.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/search')} className="bg-white text-primary-700 font-bold px-8 py-3.5 rounded-xl hover:bg-gray-50 transition-colors">
                Find Helpers Now
              </button>
              <button onClick={() => navigate('/register')} className="border-2 border-white text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors">
                Become a Worker
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
