import { useState, useEffect } from 'react';
import { FiTrash2, FiSearch } from 'react-icons/fi';
import api from '../../services/api';
import Navbar from '../../components/common/Navbar';
import Spinner from '../../components/common/Spinner';
import toast from 'react-hot-toast';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const load = () => {
    setLoading(true);
    api.get(`/admin/users?search=${search}`).then((res) => setUsers(res.data.data)).finally(() => setLoading(false));
  };

  useEffect(() => { const t = setTimeout(load, 300); return () => clearTimeout(t); }, [search]);

  const handleDelete = async (id) => {
    if (!confirm('Remove this user?')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      toast.success('User removed');
      load();
    } catch { toast.error('Failed'); }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..." className="input pl-9 text-sm w-56" />
          </div>
        </div>

        {loading ? <Spinner /> : (
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Name', 'Email', 'Role', 'Joined', 'Actions'].map((h) => (
                    <th key={h} className="text-left py-3 text-gray-500 font-medium pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <img src={u.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&size=32&background=e9d5ff&color=7e22ce`}
                          className="w-8 h-8 rounded-full object-cover" alt="" />
                        <span className="font-medium text-gray-900">{u.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-gray-500">{u.email}</td>
                    <td className="py-3 pr-4">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : u.role === 'worker' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-gray-400">{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="py-3">
                      {u.role !== 'admin' && (
                        <button onClick={() => handleDelete(u._id)}
                          className="text-red-400 hover:text-red-600 transition-colors p-1">
                          <FiTrash2 size={15} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && <p className="text-center text-gray-400 py-8">No users found</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
