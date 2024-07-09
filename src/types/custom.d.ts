declare namespace Express {
  import User from '../models/User';

  export interface Request {
    user?: User;
  }
}
