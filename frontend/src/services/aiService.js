import api from './api';

export const generateWorkerBio = (data) => api.post('/ai/generate-bio', data);
