import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Token is missing.');
    return res.status(401).json({
      error: error.message,
    });
  }
  const token = authHeader.split(' ')[1];
  let decodedToken: any;
  try {
    console.log(token);
    decodedToken = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    const error = new Error('Something went wrong verifying token.');
    return res.status(401).json({
      error: error.message,
    });
  }
  if (!decodedToken) {
    const error = new Error('Token invalid or Not authenticated.');
    return res.status(401).json({
      error: error.message,
    });
  }
  req.user.userId = decodedToken.userId;
  next();
};
