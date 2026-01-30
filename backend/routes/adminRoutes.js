import express from 'express';
import {
    getAdminAnalytics,
    updateEventStatus,
    getAllUsers,
    getPendingEvents,
} from '../controllers/adminController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roleAuth.js';

const router = express.Router();

router.get('/analytics', protect, authorize('admin'), getAdminAnalytics);
router.get('/users', protect, authorize('admin'), getAllUsers);
router.get('/events/pending', protect, authorize('admin'), getPendingEvents);
router.patch('/events/:id/status', protect, authorize('admin'), updateEventStatus);

export default router;
