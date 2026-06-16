import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiHeart, FiUser, FiSearch, FiClock, FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { getUserBookings } from '../../services/bookingService';
import Navbar from '../../components/common/Navbar';
import Spinner from '../../components/common/Spinner';

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-700',
  accepted: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  rejected: 'bg-gray-100 text-gray-500',
};

const UserDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserBookings({ limit: 5 })
      .then((res) => setBookings(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: 'Total Bookings', value: bookings.length, icon: <FiCalendar />, color: 'text-primary-600 bg-primary-50' },
    { label: 'Active Bookings', value: bookings.filter((b) => b.status === 'accepted').length, icon: <FiClock />, color: 'text-blue-600 bg-blue-50' },
    { label: 'Completed', value: bookings.filter((b) => b.status === 'completed').length, icon: <FiCheckCircle />, color: 'text-green-600 bg-green-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your bookings and find home helpers.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>{s.icon}</div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-sm text-gray-500">{s.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { to: '/search', icon: <FiSearch />, label: 'Find Helpers', color: 'bg-primary-600 text-white' },
            { to: '/my-bookings', icon: <FiCalendar />, label: 'My Bookings', color: 'bg-white text-gray-700 border border-gray-200' },
            { to: '/favorites', icon: <FiHeart />, label: 'Favorites', color: 'bg-white text-gray-700 border border-gray-200' },
            { to: '/dashboard', icon: <FiUser />, label: 'Profile', color: 'bg-white text-gray-700 border border-gray-200' },
          ].map((a) => (
            <Link key={a.to} to={a.to}
              className={`card flex flex-col items-center gap-2 py-5 text-sm font-medium hover:shadow-md transition-shadow ${a.color}`}>
              <span className="text-lg">{a.icon}</span>
              {a.label}
            </Link>
          ))}
        </div>

        {/* Recent bookings */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900">Recent Bookings</h2>
            <Link to="/my-bookings" className="text-sm text-primary-600 hover:underline">View all</Link>
          </div>

          {loading ? <Spinner /> : bookings.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400 text-sm">No bookings yet.</p>
              <Link to="/search" className="btn-primary mt-3 inline-block text-sm py-2">Find a Helper</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map((b) => (
                <div key={b._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <img
                      src={b.worker?.user?.avatar || `https://ui-avatars.com/api/?name=W&background=a855f7&color=fff&size=40`}
                      className="w-10 h-10 rounded-xl object-cover"
                      alt=""
                    />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{b.worker?.user?.name}</p>
                      <p className="text-xs text-gray-400">{new Date(b.date).toLocaleDateString('en-IN')} · {b.time}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[b.status]}`}>{b.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
