import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import routes from './src/routes';
import passport from 'passport';
import googleLogin from './src/services/googleStrategy';
import passportLocalLogin from './src/services/localStrategy';
import mongoose from 'mongoose';
const app = express();
const port = process.env.JLA_APP_PORT;

app.use(bodyParser.json()); // application/json
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
passport.use(googleLogin);
passport.use(passportLocalLogin);

const dbConnection = process.env.MONGO_URI || '';

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

/* ROUTES */
app.use('/', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

// Connect to Mongo
mongoose
  .connect(dbConnection)
  .then(() => {
    console.log('MongoDB Connected...');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
    //seedDb();
  })
  .catch((err) => console.log(err));
