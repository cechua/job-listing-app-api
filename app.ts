import express, { Request, Response } from 'express';

import jobsRouter from './src/routes/jobs';

const app = express();
const port = process.env.JLA_APP_PORT;

app.use('/jobs', jobsRouter);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
