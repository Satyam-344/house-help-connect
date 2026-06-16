import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiX } from 'react-icons/fi';
import { getUserBookings, updateBookingStatus } from '../../services/bookingService';
import Navbar from '../../components/common/Navbar';
import Spinner from '../../components/common/Spinner';
import toast from 'react-hot-toast';

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-700',
  accepted: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  rejected: 'bg-gray-100 text-gray-500',
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await getUserBookings({ status: filter || undefined });
      setBookings(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [filter]);

  const handleCancel = async (id) => {
    if (!confirm('Cancel this booking?')) return;
    try {
      await updateBookingStatus(id, 'cancelled');
      toast.success('Booking cancelled');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input text-sm w-40 bg-white">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {loading ? <Spinner /> : bookings.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No bookings found</h3>
            <Link to="/search" className="btn-primary mt-3 inline-block text-sm py-2">Find a Helper</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <motion.div key={b._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={b.worker?.user?.avatar || `https://ui-avatars.com/api/?name=W&background=a855f7&color=fff&size=60`}
                      className="w-14 h-14 rounded-xl object-cover"
                      alt=""
                    />
                    <div>
                      <Link to={`/workers/${b.worker?._id}`} className="font-semibold text-gray-900 hover:text-primary-600">
                        {b.worker?.user?.name}
                      </Link>
                      <p className="text-sm text-gray-500 capitalize">{b.worker?.category}</p>
                      <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><FiCalendar size={11} /> {new Date(b.date).toLocaleDateString('en-IN')}</span>
                        <span className="flex items-center gap-1"><FiClock size={11} /> {b.time} · {b.hours}h</span>
                        <span className="flex items-center gap-1"><FiMapPin size={11} /> {b.address?.city}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${STATUS_STYLES[b.status]}`}>{b.status}</span>
                    <p className="font-bold text-primary-600">₹{b.totalAmount}</p>
                    {['pending', 'accepted'].includes(b.status) && (
                      <button onClick={() => handleCancel(b._id)}
                        className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors">
                        <FiX size={12} /> Cancel
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
