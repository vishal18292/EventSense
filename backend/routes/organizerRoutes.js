import express from 'express';
import { getOrganizerAnalytics } from '../controllers/organizerController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roleAuth.js';

const router = express.Router();

router.get('/analytics', protect, authorize('organizer'), getOrganizerAnalytics);

export default router;
