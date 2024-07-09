import { Request, Response, Router } from 'express';
import requireLocalAuth from '../../middleware/requireLocalAuth';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || '';

router.post('/login', requireLocalAuth, (req: Request, res: Response) => {
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

    res.cookie('x-auth-cookie', token);
    res.json({ token });
    //change to redirect?
  } else {
    res.json({ message: 'something went wrong' });
  }
});

export default router;
