import { Strategy as PassportLocalStrategy } from 'passport-local';

const passportLocalLogin = new PassportLocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      const temporaryUser = {
        provider: 'google',
        googleId: '1',
        username: `testusername`,
        email: 'test@test.com',
        name: 'Temp Test local',
        avatar: '',
      };
      return done(null, temporaryUser);
    } catch (err) {
      return done(err);
    }
  }
);

export default passportLocalLogin;
