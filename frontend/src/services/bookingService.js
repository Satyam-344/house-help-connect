import api from './api';

export const createBooking = (data) => api.post('/bookings', data);
export const getUserBookings = (params) => api.get('/bookings/my', { params });
export const getWorkerBookings = (params) => api.get('/bookings/worker', { params });
export const updateBookingStatus = (id, status) => api.put(`/bookings/${id}/status`, { status });
