import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || '';

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

const clientUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_URL_PROD
    : process.env.CLIENT_URL_DEV;

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    console.log(req.user);
    // const token = req.user.generateJWT();
    if (req.user) {
      const token = jwt.sign(
        {
          expiresIn: '1h',
          id: req.user.googleId,
          provider: req.user.provider,
          email: req.user.email,
        },
        JWT_SECRET
      );
      console.log(token);
      res.cookie('x-auth-cookie', token);
    }

    res.redirect(clientUrl || '');
  }
);

export default router;
