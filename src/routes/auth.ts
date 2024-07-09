import express from 'express';
import authController from '../controllers/authController';

const authRouter = express.Router();

// /auth/login
authRouter.post('/login', authController.loginUser);

export default authRouter;
