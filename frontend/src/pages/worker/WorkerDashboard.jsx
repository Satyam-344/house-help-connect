import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiCheckCircle, FiStar, FiEdit } from 'react-icons/fi';
import { getMyWorkerProfile } from '../../services/workerService';
import { getWorkerBookings } from '../../services/bookingService';
import Navbar from '../../components/common/Navbar';
import Spinner from '../../components/common/Spinner';

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-700',
  accepted: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  rejected: 'bg-gray-100 text-gray-500',
};

const WorkerDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getMyWorkerProfile(), getWorkerBookings({ limit: 10 })])
      .then(([pRes, bRes]) => {
        setProfile(pRes.data.data);
        setBookings(bRes.data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <><Navbar /><Spinner fullScreen /></>;

  const earnings = bookings.filter((b) => b.status === 'completed').reduce((s, b) => s + b.totalAmount, 0);

  const stats = [
    { label: 'Total Requests', value: bookings.length, icon: <FiCalendar />, color: 'text-primary-600 bg-primary-50' },
    { label: 'Completed Jobs', value: bookings.filter((b) => b.status === 'completed').length, icon: <FiCheckCircle />, color: 'text-green-600 bg-green-50' },
    { label: 'Avg Rating', value: profile?.rating?.toFixed(1) || '—', icon: <FiStar />, color: 'text-yellow-600 bg-yellow-50' },
    { label: 'Total Earnings', value: `₹${earnings}`, icon: '💰', color: 'text-purple-600 bg-purple-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Worker Dashboard</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${profile?.isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {profile?.isApproved ? '✓ Approved' : '⏳ Pending Approval'}
              </span>
            </div>
          </div>
          <Link to="/worker/setup" className="btn-outline text-sm py-2 flex items-center gap-1.5">
            <FiEdit size={14} /> Edit Profile
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-lg ${s.color}`}>{s.icon}</div>
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link to="/worker/bookings" className="card flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center"><FiCalendar /></div>
            <div>
              <p className="font-semibold text-gray-900">Booking Requests</p>
              <p className="text-sm text-gray-500">{bookings.filter((b) => b.status === 'pending').length} pending</p>
            </div>
          </Link>
          <Link to="/worker/setup" className="card flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center"><FiEdit /></div>
            <div>
              <p className="font-semibold text-gray-900">Edit Profile</p>
              <p className="text-sm text-gray-500">Update availability & skills</p>
            </div>
          </Link>
        </div>

        {/* Recent bookings */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Recent Bookings</h2>
            <Link to="/worker/bookings" className="text-sm text-primary-600 hover:underline">View all</Link>
          </div>
          {bookings.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">No bookings yet. Complete your profile to get discovered!</p>
          ) : (
            <div className="space-y-3">
              {bookings.slice(0, 5).map((b) => (
                <div key={b._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{b.user?.name}</p>
                    <p className="text-xs text-gray-400">{new Date(b.date).toLocaleDateString('en-IN')} · {b.time} · {b.hours}h</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${STATUS_STYLES[b.status]}`}>{b.status}</span>
                    <p className="text-sm font-bold text-primary-600 mt-1">₹{b.totalAmount}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
