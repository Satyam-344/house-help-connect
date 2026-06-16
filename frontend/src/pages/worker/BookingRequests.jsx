import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiClock, FiCheck, FiX } from 'react-icons/fi';
import { getWorkerBookings, updateBookingStatus } from '../../services/bookingService';
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

const BookingRequests = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');

  const load = async () => {
    setLoading(true);
    try {
      const res = await getWorkerBookings({ status: filter || undefined });
      setBookings(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [filter]);

  const handleStatus = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      toast.success(`Booking ${status}`);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Booking Requests</h1>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input text-sm w-40 bg-white">
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {loading ? <Spinner /> : bookings.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-500">No {filter || ''} bookings found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <motion.div key={b._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img src={b.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(b.user?.name || 'U')}&background=e9d5ff&color=7e22ce&size=60`}
                      className="w-12 h-12 rounded-xl object-cover" alt="" />
                    <div>
                      <p className="font-semibold text-gray-900">{b.user?.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{b.user?.phone}</p>
                      <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><FiCalendar size={11} /> {new Date(b.date).toLocaleDateString('en-IN')}</span>
                        <span className="flex items-center gap-1"><FiClock size={11} /> {b.time} · {b.hours}h</span>
                        <span className="flex items-center gap-1"><FiMapPin size={11} /> {b.address?.city}, {b.address?.pincode}</span>
                      </div>
                      {b.notes && <p className="text-xs text-gray-400 mt-1 italic">"{b.notes}"</p>}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[b.status]}`}>{b.status}</span>
                    <p className="font-bold text-primary-600">₹{b.totalAmount}</p>

                    {b.status === 'pending' && (
                      <div className="flex gap-2 mt-1">
                        <button onClick={() => handleStatus(b._id, 'accepted')}
                          className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 hover:bg-green-200 px-3 py-1.5 rounded-lg transition-colors">
                          <FiCheck size={12} /> Accept
                        </button>
                        <button onClick={() => handleStatus(b._id, 'rejected')}
                          className="flex items-center gap-1 text-xs font-medium text-red-700 bg-red-100 hover:bg-red-200 px-3 py-1.5 rounded-lg transition-colors">
                          <FiX size={12} /> Reject
                        </button>
                      </div>
                    )}
                    {b.status === 'accepted' && (
                      <button onClick={() => handleStatus(b._id, 'completed')}
                        className="text-xs font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 px-3 py-1.5 rounded-lg transition-colors">
                        Mark Complete
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

export default BookingRequests;
