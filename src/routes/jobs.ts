import express from 'express';

import jobsController from '../controllers/jobsController';

const jobsRouter = express.Router();

// /jobs
jobsRouter.get('/', jobsController.getJobs);

// /jobs/:jobId
jobsRouter.get('/:jobId', jobsController.getJobsById);
export default jobsRouter;
