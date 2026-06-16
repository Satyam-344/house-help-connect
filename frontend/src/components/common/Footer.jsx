import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">H</span>
            <span className="text-white font-bold text-lg">HouseHelp Connect</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            Find trusted maids, cooks, nurses, and home helpers near you. Safe, verified, and affordable.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white transition-colors"><FiInstagram size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><FiFacebook size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><FiTwitter size={20} /></a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/search" className="hover:text-white transition-colors">Find Helpers</Link></li>
            <li><Link to="/register" className="hover:text-white transition-colors">Become a Worker</Link></li>
            <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Services</h4>
          <ul className="space-y-2 text-sm">
            {['Maid', 'Cook', 'Nurse', 'Babysitter', 'Driver', 'Gardener'].map((s) => (
              <li key={s}><Link to={`/search?category=${s.toLowerCase()}`} className="hover:text-white transition-colors">{s}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-6 text-center text-sm">
        <p>© {new Date().getFullYear()} House Help Connect. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
