import passport from 'passport';
import localStrategy from './strategies/local.strategy';
import facebookStrategy from './strategies/facebook.strategy';
import googleStrategy from './strategies/google.strategy';
import linkedinStrategy from './strategies/linkedin.strategy';
import twitterStrategy from './strategies/twitter.strategy';

export default app => {
  app.use(passport.initialize());
  localStrategy();
  facebookStrategy();
  googleStrategy();
  linkedinStrategy();
  twitterStrategy();
};
