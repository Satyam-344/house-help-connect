import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFilter, FiX } from 'react-icons/fi';
import { getWorkers } from '../services/workerService';
import WorkerCard from '../components/cards/WorkerCard';
import WorkerCardSkeleton from '../components/loaders/WorkerCardSkeleton';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const CATEGORIES = ['maid', 'cook', 'nurse', 'babysitter', 'caretaker', 'driver', 'gardener', 'housekeeper', 'elderly-care'];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    city: searchParams.get('city') || '',
    minRating: '',
    maxRate: '',
    minExperience: '',
    gender: '',
    sortBy: 'rating',
  });

  const fetchWorkers = useCallback(async () => {
    setLoading(true);
    try {
      const params = { ...filters, page, limit: 12 };
      Object.keys(params).forEach((k) => !params[k] && delete params[k]);
      const res = await getWorkers(params);
      setWorkers(res.data.data);
      setTotal(res.data.pagination.total);
    } catch {
      setWorkers([]);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => { fetchWorkers(); }, [fetchWorkers]);

  const updateFilter = (key, val) => {
    setFilters((prev) => ({ ...prev, [key]: val }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({ category: '', city: '', minRating: '', maxRate: '', minExperience: '', gender: '', sortBy: 'rating' });
    setPage(1);
  };

  const totalPages = Math.ceil(total / 12);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Find Home Helpers</h1>
            <p className="text-sm text-gray-500 mt-1">{total} workers available</p>
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 btn-outline text-sm py-2">
            <FiFilter size={14} /> Filters
          </button>
        </div>

        <div className="flex gap-6">
          {/* Filters sidebar */}
          {showFilters && (
            <motion.aside
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="w-64 flex-shrink-0"
            >
              <div className="card sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  <button onClick={clearFilters} className="text-xs text-primary-600 hover:underline flex items-center gap-1">
                    <FiX size={12} /> Clear all
                  </button>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select value={filters.category} onChange={(e) => updateFilter('category', e.target.value)} className="input text-sm bg-white">
                      <option value="">All Categories</option>
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1).replace('-', ' ')}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input placeholder="e.g. Mumbai" value={filters.city} onChange={(e) => updateFilter('city', e.target.value)} className="input text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Min Rating</label>
                    <select value={filters.minRating} onChange={(e) => updateFilter('minRating', e.target.value)} className="input text-sm bg-white">
                      <option value="">Any</option>
                      <option value="4">4+ Stars</option>
                      <option value="4.5">4.5+ Stars</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Rate (₹/hr)</label>
                    <input type="number" placeholder="e.g. 500" value={filters.maxRate} onChange={(e) => updateFilter('maxRate', e.target.value)} className="input text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Min Experience (yrs)</label>
                    <select value={filters.minExperience} onChange={(e) => updateFilter('minExperience', e.target.value)} className="input text-sm bg-white">
                      <option value="">Any</option>
                      <option value="1">1+ year</option>
                      <option value="3">3+ years</option>
                      <option value="5">5+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select value={filters.gender} onChange={(e) => updateFilter('gender', e.target.value)} className="input text-sm bg-white">
                      <option value="">Any</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                    <select value={filters.sortBy} onChange={(e) => updateFilter('sortBy', e.target.value)} className="input text-sm bg-white">
                      <option value="rating">Highest Rated</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="experience">Most Experienced</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}

          {/* Results */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => <WorkerCardSkeleton key={i} />)}
              </div>
            ) : workers.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No workers found</h3>
                <p className="text-gray-400 text-sm">Try adjusting your filters</p>
                <button onClick={clearFilters} className="btn-primary mt-4 text-sm py-2">Clear Filters</button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {workers.map((w) => <WorkerCard key={w._id} worker={w} />)}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                      className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium disabled:opacity-40 hover:bg-gray-50">
                      Previous
                    </button>
                    <span className="px-4 py-2 text-sm text-gray-600">{page} / {totalPages}</span>
                    <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                      className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium disabled:opacity-40 hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Search;
