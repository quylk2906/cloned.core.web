import passport from 'passport';
import TwitterStrategy from 'passport-twitter';
import { twitterConfig } from '../index';

export default () => {
  passport.use(
    new TwitterStrategy(twitterConfig, async (req, accessToken, refreshToken, profile, done) => {
      try {
        if (!accessToken) {
          done(null, false);
        }
        done(null, {
          accessToken,
          profile,
          refreshToken
        });
      } catch (err) {
        done(null, false);
      }
    })
  );
};
