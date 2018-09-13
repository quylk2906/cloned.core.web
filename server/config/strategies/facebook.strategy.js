import passport from 'passport';
import User from '../../models/user.model';
import FacebookStrategy from 'passport-facebook';
import { facebookConfig } from '../index';

export default () => {
  passport.use(
    new FacebookStrategy(facebookConfig, async (req, accessToken, refreshToken, profile, done) => {
      try {
        if (!accessToken) {
          done(null, false);
        }
        done(null, { accessToken, profile, refreshToken });
      } catch (err) {
        done(null, false);
      }
    })
  );
};
