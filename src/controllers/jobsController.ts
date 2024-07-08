import { NextFunction, Request, Response } from 'express';

const getJobs = (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello, getJobs!');
};

const getJobsById = (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello, getJobsById!');
};

export default {
  getJobs,
  getJobsById,
};
