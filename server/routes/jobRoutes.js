import express from 'express';
const router = express.Router();
import { getJobs, setJob, updateJob, deleteJob } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

// Apply protect middleware to all routes
router.use(protect);

router.route('/').get(getJobs).post(setJob);
router.route('/:id').put(updateJob).delete(deleteJob);

export default router;
