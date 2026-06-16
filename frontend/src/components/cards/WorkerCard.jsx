import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiMapPin, FiClock, FiHeart } from 'react-icons/fi';
import { toggleFavorite } from '../../services/workerService';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const CATEGORY_COLORS = {
  maid: 'bg-pink-100 text-pink-700',
  cook: 'bg-orange-100 text-orange-700',
  nurse: 'bg-blue-100 text-blue-700',
  babysitter: 'bg-yellow-100 text-yellow-700',
  caretaker: 'bg-green-100 text-green-700',
  driver: 'bg-gray-100 text-gray-700',
  gardener: 'bg-emerald-100 text-emerald-700',
  housekeeper: 'bg-purple-100 text-purple-700',
  'elderly-care': 'bg-teal-100 text-teal-700',
};

const WorkerCard = ({ worker, isFav = false }) => {
  const { user } = useAuth();
  const [fav, setFav] = useState(isFav);
  const [toggling, setToggling] = useState(false);

  const { _id, user: workerUser, category, rating, totalReviews, experience, hourlyRate, location, photos, isApproved } = worker;

  const handleFav = async (e) => {
    e.preventDefault();
    if (!user) return toast.error('Please login to save favorites');
    setToggling(true);
    try {
      const res = await toggleFavorite(_id);
      setFav(res.data.data.isFavorite);
    } catch {
      // error handled by interceptor
    } finally {
      setToggling(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="card hover:shadow-lg transition-shadow duration-300 relative group"
    >
      {/* Favorite button */}
      <button
        onClick={handleFav}
        disabled={toggling}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
      >
        <FiHeart size={16} className={fav ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
      </button>

      <Link to={`/workers/${_id}`}>
        {/* Photo */}
        <div className="relative mb-4">
          <img
            src={photos?.[0] || workerUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(workerUser?.name || 'W')}&background=a855f7&color=fff&size=200`}
            alt={workerUser?.name}
            className="w-full h-48 object-cover rounded-xl"
          />
          {!isApproved && (
            <span className="absolute bottom-2 left-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Pending</span>
          )}
        </div>

        {/* Info */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-gray-900 text-lg leading-tight">{workerUser?.name}</h3>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${CATEGORY_COLORS[category] || 'bg-gray-100 text-gray-600'}`}>
              {category}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <FiStar size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-800">{rating.toFixed(1)}</span>
            <span className="text-xs text-gray-400">({totalReviews} reviews)</span>
          </div>

          {/* Location & experience */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {location?.city && (
              <span className="flex items-center gap-1">
                <FiMapPin size={11} /> {location.city}
              </span>
            )}
            <span className="flex items-center gap-1">
              <FiClock size={11} /> {experience} yr{experience !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-50">
            <div>
              <span className="text-xl font-bold text-primary-600">₹{hourlyRate}</span>
              <span className="text-xs text-gray-400">/hr</span>
            </div>
            <span className="text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">View Profile →</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default WorkerCard;
