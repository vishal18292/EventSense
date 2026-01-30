import express from 'express';
import {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    getOrganizerEvents,
    getRecommendedEvents,
} from '../controllers/eventController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roleAuth.js';

const router = express.Router();

// Public routes
router.get('/', getEvents);
router.get('/recommended', protect, getRecommendedEvents);
router.get('/:id', getEventById);

// Organizer routes
router.post('/', protect, authorize('organizer'), createEvent);
router.get('/organizer/myevents', protect, authorize('organizer'), getOrganizerEvents);
router.put('/:id', protect, authorize('organizer'), updateEvent);
router.delete('/:id', protect, authorize('organizer'), deleteEvent);

export default router;
