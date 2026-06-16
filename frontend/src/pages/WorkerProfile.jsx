import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiMapPin, FiClock, FiHeart, FiPhone, FiCalendar } from 'react-icons/fi';
import { getWorkerById, getWorkerReviews, toggleFavorite } from '../services/workerService';
import { createBooking } from '../services/bookingService';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Spinner from '../components/common/Spinner';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const WorkerProfile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [worker, setWorker] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fav, setFav] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [booking, setBooking] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const hours = watch('hours', 1);

  useEffect(() => {
    const load = async () => {
      try {
        const [wRes, rRes] = await Promise.all([getWorkerById(id), getWorkerReviews(id)]);
        setWorker(wRes.data.data);
        setReviews(rRes.data.data);
      } catch {
        navigate('/search');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  const handleFav = async () => {
    if (!user) return toast.error('Please login to save favorites');
    try {
      const res = await toggleFavorite(id);
      setFav(res.data.data.isFavorite);
      toast.success(res.data.message);
    } catch {}
  };

  const onBook = async (data) => {
    if (!user) return navigate('/login');
    setBooking(true);
    try {
      await createBooking({
        workerId: id,
        date: data.date,
        time: data.time,
        hours: parseInt(data.hours),
        address: { street: data.street, city: data.city, state: data.state, pincode: data.pincode },
        notes: data.notes,
        paymentMethod: 'cash',
      });
      toast.success('Booking created! Waiting for worker acceptance.');
      setShowBooking(false);
      navigate('/my-bookings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <><Navbar /><Spinner fullScreen /></>;
  if (!worker) return null;

  const { user: wUser, category, bio, skills, languages, experience, hourlyRate, photos, availability, rating, totalReviews, location } = worker;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
              <div className="flex flex-col sm:flex-row gap-6">
                <img
                  src={photos?.[0] || wUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(wUser?.name || 'W')}&background=a855f7&color=fff&size=200`}
                  alt={wUser?.name}
                  className="w-32 h-32 rounded-2xl object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{wUser?.name}</h1>
                      <span className="inline-block mt-1 text-sm font-medium bg-primary-100 text-primary-700 px-3 py-0.5 rounded-full capitalize">
                        {category?.replace('-', ' ')}
                      </span>
                    </div>
                    <button onClick={handleFav} className="p-2 rounded-full border border-gray-200 hover:border-red-200 transition-colors">
                      <FiHeart size={18} className={fav ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1.5"><FiStar size={14} className="fill-yellow-400 text-yellow-400" />
                      <strong>{rating.toFixed(1)}</strong> ({totalReviews} reviews)
                    </span>
                    <span className="flex items-center gap-1.5"><FiClock size={14} /> {experience} yrs exp</span>
                    {location?.city && <span className="flex items-center gap-1.5"><FiMapPin size={14} /> {location.city}</span>}
                  </div>

                  <div className="mt-3">
                    <span className="text-2xl font-bold text-primary-600">₹{hourlyRate}</span>
                    <span className="text-gray-400 text-sm">/hour</span>
                  </div>
                </div>
              </div>

              {bio && (
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{bio}</p>
                </div>
              )}
            </motion.div>

            {/* Skills & languages */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Skills & Languages</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills?.map((s) => (
                  <span key={s} className="text-sm bg-primary-50 text-primary-700 px-3 py-1 rounded-full">{s}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {languages?.map((l) => (
                  <span key={l} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{l}</span>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Availability</h3>
              <div className="grid grid-cols-7 gap-2 mb-3">
                {DAYS.map((d) => (
                  <div key={d} className={`text-center py-2 rounded-lg text-xs font-medium ${availability?.[d] ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                    {d.slice(0, 3).toUpperCase()}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Working hours: <strong>{availability?.startTime}</strong> – <strong>{availability?.endTime}</strong>
              </p>
            </div>

            {/* Reviews */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Reviews ({reviews.length})</h3>
              {reviews.length === 0 ? (
                <p className="text-gray-400 text-sm">No reviews yet. Be the first!</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((r) => (
                    <div key={r._id} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={r.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.user?.name || 'U')}&size=40&background=e9d5ff&color=7e22ce`}
                          alt={r.user?.name}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{r.user?.name}</p>
                          <div className="flex gap-0.5">
                            {Array.from({ length: r.rating }).map((_, i) => (
                              <FiStar key={i} size={11} className="fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{r.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right — booking sidebar */}
          <div className="space-y-4">
            <div className="card sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-1">Book {wUser?.name}</h3>
              <p className="text-sm text-gray-500 mb-5">Fill in the details below</p>

              {!showBooking ? (
                <button onClick={() => user ? setShowBooking(true) : navigate('/login')}
                  className="btn-primary w-full py-3 flex items-center justify-center gap-2">
                  <FiCalendar size={16} /> Book Now
                </button>
              ) : (
                <form onSubmit={handleSubmit(onBook)} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
                    <input type="date" className="input text-sm"
                      min={new Date().toISOString().split('T')[0]}
                      {...register('date', { required: 'Date required' })} />
                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Time</label>
                    <input type="time" className="input text-sm" {...register('time', { required: 'Time required' })} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Hours</label>
                    <select className="input text-sm bg-white" {...register('hours')}>
                      {[1, 2, 3, 4, 6, 8].map((h) => <option key={h} value={h}>{h} hour{h > 1 ? 's' : ''}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Address</label>
                    <input placeholder="Street" className="input text-sm mb-2" {...register('street', { required: 'Street required' })} />
                    <div className="grid grid-cols-2 gap-2">
                      <input placeholder="City" className="input text-sm" {...register('city', { required: true })} />
                      <input placeholder="State" className="input text-sm" {...register('state', { required: true })} />
                    </div>
                    <input placeholder="Pincode" className="input text-sm mt-2" {...register('pincode', { required: true })} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Notes (optional)</label>
                    <textarea rows={2} className="input text-sm resize-none" placeholder="Any special instructions..."
                      {...register('notes')} />
                  </div>

                  <div className="bg-primary-50 rounded-xl p-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total ({hours} hr{hours > 1 ? 's' : ''})</span>
                      <span className="font-bold text-primary-700">₹{hourlyRate * (parseInt(hours) || 1)}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Payment: Cash on delivery</p>
                  </div>

                  <button type="submit" disabled={booking} className="btn-primary w-full py-2.5 text-sm">
                    {booking ? 'Confirming...' : 'Confirm Booking'}
                  </button>
                  <button type="button" onClick={() => setShowBooking(false)} className="w-full text-sm text-gray-500 hover:text-gray-700 py-1.5">
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WorkerProfile;
