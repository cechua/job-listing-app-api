import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';

const loginUser = (req: Request, res: Response, next: NextFunction) => {
  /** setup login here once db is initialized */

  /**Temporary user for JWT Token */
  let tempuserId = 'Test User';
  let tempEmail = 'testuser@test.com';

  /* Create  and return JWT Token */
  let token;
  try {
    //Creating jwt token
    token = jwt.sign(
      {
        userId: tempuserId,
        email: tempEmail,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
  } catch (err) {
    console.log(err);
    const error = new Error('Error! Something went wrong.');
    return next(error);
  }

  res.status(200).json({
    success: true,
    data: {
      userId: tempuserId,
      email: tempEmail,
      token: token,
    },
  });
};

export default {
  loginUser,
};
