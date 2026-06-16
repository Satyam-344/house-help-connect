import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUsers, FiBriefcase, FiCalendar, FiClock } from 'react-icons/fi';
import api from '../../services/api';
import Navbar from '../../components/common/Navbar';
import Spinner from '../../components/common/Spinner';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/dashboard').then((res) => setData(res.data.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <><Navbar /><Spinner fullScreen /></>;

  const stats = [
    { label: 'Total Users', value: data.totalUsers, icon: <FiUsers />, color: 'text-blue-600 bg-blue-50', to: '/admin/users' },
    { label: 'Total Workers', value: data.totalWorkers, icon: <FiBriefcase />, color: 'text-purple-600 bg-purple-50', to: '/admin/workers' },
    { label: 'Total Bookings', value: data.totalBookings, icon: <FiCalendar />, color: 'text-green-600 bg-green-50', to: '#' },
    { label: 'Pending Approvals', value: data.pendingWorkers, icon: <FiClock />, color: 'text-orange-600 bg-orange-50', to: '/admin/workers' },
  ];

  const STATUS_STYLES = { pending: 'bg-yellow-100 text-yellow-700', accepted: 'bg-blue-100 text-blue-700', completed: 'bg-green-100 text-green-700', cancelled: 'bg-red-100 text-red-700', rejected: 'bg-gray-100 text-gray-500' };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <Link to={s.to} key={s.label}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card hover:shadow-md transition-shadow cursor-pointer">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>{s.icon}</div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link to="/admin/workers" className="card flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center"><FiClock /></div>
            <div>
              <p className="font-semibold text-gray-900">Pending Worker Approvals</p>
              <p className="text-sm text-gray-500">{data.pendingWorkers} workers waiting</p>
            </div>
          </Link>
          <Link to="/admin/users" className="card flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center"><FiUsers /></div>
            <div>
              <p className="font-semibold text-gray-900">Manage Users</p>
              <p className="text-sm text-gray-500">{data.totalUsers} registered users</p>
            </div>
          </Link>
        </div>

        {/* Recent bookings */}
        <div className="card">
          <h2 className="font-bold text-gray-900 mb-4">Recent Bookings</h2>
          {data.recentBookings.length === 0 ? <p className="text-gray-400 text-sm">No bookings yet</p> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 text-gray-500 font-medium">Customer</th>
                    <th className="text-left py-2 text-gray-500 font-medium">Worker</th>
                    <th className="text-left py-2 text-gray-500 font-medium">Date</th>
                    <th className="text-left py-2 text-gray-500 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentBookings.map((b) => (
                    <tr key={b._id} className="border-b border-gray-50">
                      <td className="py-2.5 text-gray-900">{b.user?.name}</td>
                      <td className="py-2.5 text-gray-600">{b.worker?.user?.name}</td>
                      <td className="py-2.5 text-gray-500">{new Date(b.date).toLocaleDateString('en-IN')}</td>
                      <td className="py-2.5">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${STATUS_STYLES[b.status]}`}>{b.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
