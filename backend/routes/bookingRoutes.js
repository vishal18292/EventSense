import express from 'express';
import {
    createBooking,
    getUserBookings,
    getBookingById,
    getEventBookings,
} from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roleAuth.js';

const router = express.Router();

// User routes
router.post('/', protect, createBooking);
router.get('/', protect, getUserBookings);
router.get('/:id', protect, getBookingById);

// Organizer routes
router.get(
    '/organizer/event/:eventId',
    protect,
    authorize('organizer'),
    getEventBookings
);

export default router;
