import express from 'express';

import jobsController from '../../controllers/jobsController';
import { isAuthenticated } from '../../middleware/isAuthenticated';

const jobsRouter = express.Router();

// /jobs
jobsRouter.get('/', jobsController.getJobs);

// /jobs/:jobId
jobsRouter.get('/:jobId', jobsController.getJobsById);

// /jobs/apply/:jobId
jobsRouter.post(
  '/apply/:jobId',
  isAuthenticated,
  jobsController.postApplyJobById
);

export default jobsRouter;
