import { useState, useEffect } from 'react';
import { getFavorites } from '../../services/workerService';
import WorkerCard from '../../components/cards/WorkerCard';
import WorkerCardSkeleton from '../../components/loaders/WorkerCardSkeleton';
import Navbar from '../../components/common/Navbar';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFavorites().then((res) => setWorkers(res.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Saved Favorites</h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => <WorkerCardSkeleton key={i} />)}
          </div>
        ) : workers.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No favorites yet</h3>
            <p className="text-gray-400 text-sm mb-4">Save workers you like to find them quickly.</p>
            <Link to="/search" className="btn-primary text-sm py-2 inline-block">Browse Workers</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {workers.filter(Boolean).map((w) => <WorkerCard key={w._id} worker={w} isFav />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
