import passport from 'passport';
import User from '../../models/user.model';
import GoogleStrategy from 'passport-google-oauth20';
// import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { googleConfig } from '../index';

export default () => {
  passport.use(
    new GoogleStrategy(googleConfig, (req, accessToken, refreshToken, profile, done) => {
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
