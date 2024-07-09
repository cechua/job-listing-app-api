import { Router } from 'express';
import googleAuthRoutes from './authRoutes/googleAuth';
import localAuthRoutes from './authRoutes/localAuth';
import jobsRoute from './api/jobs';
const router = Router();

router.use('/auth', googleAuthRoutes);
router.use('/auth', localAuthRoutes);

router.use('/api/jobs', jobsRoute);

// fallback 404
router.use('/api', (req, res) =>
  res.status(404).json('No route for this path')
);

export default router;
