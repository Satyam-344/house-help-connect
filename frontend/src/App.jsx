import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import Spinner from './components/common/Spinner';

const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Search = lazy(() => import('./pages/Search'));
const WorkerProfile = lazy(() => import('./pages/WorkerProfile'));
const UserDashboard = lazy(() => import('./pages/user/UserDashboard'));
const MyBookings = lazy(() => import('./pages/user/MyBookings'));
const Favorites = lazy(() => import('./pages/user/Favorites'));
const WorkerDashboard = lazy(() => import('./pages/worker/WorkerDashboard'));
const WorkerSetup = lazy(() => import('./pages/worker/WorkerSetup'));
const BookingRequests = lazy(() => import('./pages/worker/BookingRequests'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ManageWorkers = lazy(() => import('./pages/admin/ManageWorkers'));
const ManageUsers = lazy(() => import('./pages/admin/ManageUsers'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => (
  <Suspense fallback={<Spinner fullScreen />}>
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/search" element={<Search />} />
      <Route path="/workers/:id" element={<WorkerProfile />} />

      {/* User routes */}
      <Route element={<ProtectedRoute allowedRoles={['user', 'worker', 'admin']} />}>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>

      {/* Worker routes */}
      <Route element={<ProtectedRoute allowedRoles={['worker']} />}>
        <Route path="/worker/dashboard" element={<WorkerDashboard />} />
        <Route path="/worker/setup" element={<WorkerSetup />} />
        <Route path="/worker/bookings" element={<BookingRequests />} />
      </Route>

      {/* Admin routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/workers" element={<ManageWorkers />} />
        <Route path="/admin/users" element={<ManageUsers />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default App;
