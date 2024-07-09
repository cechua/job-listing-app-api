declare namespace Express {
  /*Remove or modify this once Model for database is available */
  type User = {
    provider: string;
    googleId?: string;
    username: string;
    email: string;
    name: string;
    avatar: string;
  };

  export interface Request {
    user?: User;
    userId?: string;
  }
}
