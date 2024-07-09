import passport from 'passport';
import { NextFunction, Request, Response } from 'express';

const requireLocalAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: Error, user: any, info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(422).send(info);
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default requireLocalAuth;
