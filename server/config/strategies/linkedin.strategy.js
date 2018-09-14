import passport from 'passport';
import LinkedInStrategy from 'passport-linkedin';
import { linkedinConfig } from '../index';

export default () => {
  passport.use(
    new LinkedInStrategy(linkedinConfig, async (req, accessToken, refreshToken, profile, done) => {
      try {
        if (!accessToken) {
          done(null, false);
        }
        console.log('accessToken', accessToken);
        done(null, { accessToken, profile, refreshToken });
      } catch (err) {
        done(null, false);
      }
    })
  );
};
