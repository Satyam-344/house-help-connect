import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX } from 'react-icons/fi';
import api from '../../services/api';
import Navbar from '../../components/common/Navbar';
import Spinner from '../../components/common/Spinner';
import toast from 'react-hot-toast';

const ManageWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('false');

  const load = () => {
    setLoading(true);
    api.get(`/admin/workers?approved=${filter}`)
      .then((res) => setWorkers(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [filter]);

  const handleApprove = async (id, approve) => {
    try {
      await api.put(`/admin/workers/${id}/approve`, { isApproved: approve });
      toast.success(approve ? 'Worker approved' : 'Approval revoked');
      load();
    } catch {
      toast.error('Failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Manage Workers</h1>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input text-sm w-44 bg-white">
            <option value="false">Pending Approval</option>
            <option value="true">Approved</option>
            <option value="">All Workers</option>
          </select>
        </div>

        {loading ? <Spinner /> : workers.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400">No workers found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {workers.map((w) => (
              <motion.div key={w._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={w.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(w.user?.name || 'W')}&background=a855f7&color=fff&size=60`}
                      className="w-12 h-12 rounded-xl object-cover" alt=""
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{w.user?.name}</p>
                      <p className="text-sm text-gray-500">{w.user?.email}</p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full capitalize">{w.category}</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">₹{w.hourlyRate}/hr</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{w.experience} yrs</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${w.isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {w.isApproved ? 'Approved' : 'Pending'}
                    </span>
                    {w.isApproved ? (
                      <button onClick={() => handleApprove(w._id, false)}
                        className="flex items-center gap-1 text-xs font-medium text-red-700 bg-red-100 hover:bg-red-200 px-3 py-1.5 rounded-lg transition-colors">
                        <FiX size={12} /> Revoke
                      </button>
                    ) : (
                      <button onClick={() => handleApprove(w._id, true)}
                        className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 hover:bg-green-200 px-3 py-1.5 rounded-lg transition-colors">
                        <FiCheck size={12} /> Approve
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

export default ManageWorkers;
