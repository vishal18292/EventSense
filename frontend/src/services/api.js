import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use((config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        const token = JSON.parse(userInfo).token;
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth APIs
export const authAPI = {
    register: (data) => api.post('/api/auth/register', data),
    login: (data) => api.post('/api/auth/login', data),
    getProfile: () => api.get('/api/auth/profile'),
    updateProfile: (data) => api.put('/api/auth/profile', data),
};

// Event APIs
export const eventAPI = {
    getEvents: (params) => api.get('/api/events', { params }),
    getEventById: (id) => api.get(`/api/events/${id}`),
    getRecommendedEvents: () => api.get('/api/events/recommended'),
    createEvent: (data) => api.post('/api/events', data),
    updateEvent: (id, data) => api.put(`/api/events/${id}`, data),
    deleteEvent: (id) => api.delete(`/api/events/${id}`),
    getOrganizerEvents: () => api.get('/api/events/organizer/myevents'),
};

// Booking APIs
export const bookingAPI = {
    createBooking: (data) => api.post('/api/bookings', data),
    getUserBookings: () => api.get('/api/bookings'),
    getBookingById: (id) => api.get(`/api/bookings/${id}`),
    getEventBookings: (eventId) =>
        api.get(`/api/bookings/organizer/event/${eventId}`),
};

// Review APIs
export const reviewAPI = {
    addReview: (data) => api.post('/api/reviews', data),
    getEventReviews: (eventId) => api.get(`/api/reviews/event/${eventId}`),
};

// Organizer APIs
export const organizerAPI = {
    getAnalytics: () => api.get('/api/organizer/analytics'),
};

// Admin APIs
export const adminAPI = {
    getAnalytics: () => api.get('/api/admin/analytics'),
    getAllUsers: () => api.get('/api/admin/users'),
    getPendingEvents: () => api.get('/api/admin/events/pending'),
    updateEventStatus: (id, status) =>
        api.patch(`/api/admin/events/${id}/status`, { status }),
};

export default api;
