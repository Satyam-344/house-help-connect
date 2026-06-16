import api from './api';

export const getWorkers = (params) => api.get('/workers', { params });
export const getWorkerById = (id) => api.get(`/workers/${id}`);
export const createWorkerProfile = (formData) => api.post('/workers', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateWorkerProfile = (id, formData) => api.put(`/workers/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const getMyWorkerProfile = () => api.get('/workers/me');
export const toggleFavorite = (id) => api.post(`/workers/${id}/favorite`);
export const getFavorites = () => api.get('/workers/favorites');
export const getWorkerReviews = (workerId) => api.get(`/reviews/worker/${workerId}`);
