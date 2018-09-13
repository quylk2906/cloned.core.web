import User from '../models/user.model';
import passport from 'passport';
import { signToken } from '../helpers/jwtHelper';
import * as httpHelpers from '../helpers/httpResponseHelper';

export const findUserByUsername = async username => {
  return await User.findOne({ username: username });
};

const handleRegisterUser = async (req, res, profile) => {
  let user = await findUserByUsername(profile.id);
  console.log('user', user);
  let token = undefined;
  if (user) {
    token = signToken(user);
    return httpHelpers.buildGetSuccessResponse(res, { message: 'The user exists in system.', user, token });
  }
  user = new User({
    username: profile.id,
    fullName: profile.displayName,
    provider: profile.provider
  });

  const rs = await user.save();
  token = signToken(rs);
  return httpHelpers.buildGetSuccessResponse(res, { message: `Login with ${profile.provider} successfully.`, rs, token });
};

const userController = () => {
  const signUp = async (req, res) => {
    try {
      /* Field validation */
      req
        .checkBody('username', 'Username is not valid')
        .isEmail()
        .trim();
      req
        .checkBody('password', 'Password cannot be blank')
        .notEmpty()
        .trim();
      const errors = req.validationErrors();

      if (errors) {
        return httpHelpers.buildValidationErrorResponse(res, errors);
      }
      /* End of field Validation */
      const existingUser = await findUserByUsername(req.body.username);

      if (existingUser) {
        return httpHelpers.buildDuplicationErrorResponse(res, 'The user exists in system');
      }
      const user = new User(req.body);
      const newUser = await user.save();

      if (newUser) {
        const token = signToken(newUser);

        return httpHelpers.buildPostSuccessResponse(res, { token });
      } else {
        return httpHelpers.buildInternalServerErrorResponse(res, err);
      }
    } catch (err) {
      return httpHelpers.buildInternalServerErrorResponse(res, err);
    }
  };

  const profile = (req, res) => {
    httpHelpers.buildGetSuccessResponse(res, { msg: 'Login with facebook successfully' });
  };

  const getAll = async (req, res) => {
    const users = await User.find();
    httpHelpers.buildGetSuccessResponse(res, { users });
  };

  const authenticateLocal = async (req, res, next) => {
    /* Field validation */
    req
      .checkBody('username', 'Username is not valid')
      .isEmail()
      .trim();
    req
      .checkBody('password', 'Password cannot be blank')
      .notEmpty()
      .trim();
    const errors = req.validationErrors();
    if (errors) {
      return httpHelpers.buildValidationErrorResponse(res, errors);
    }

    /* End of field Validation */
    passport.authenticate('local', { session: false }, (authErr, user) => {
      try {
        if (authErr) {
          return next(authErr);
        }
        if (!user) {
          return httpHelpers.buildNotFoundErrorResponse(res, 'User not found');
        }
        const token = signToken(user);
        return httpHelpers.buildPostSuccessResponse(res, { token });
      } catch (err) {
        return httpHelpers.buildInternalServerErrorResponse(res, err);
      }
    })(req, res, next);
  };

  const authenticateFacebook = (req, res) => {
    /* End of field Validation */
    passport.authenticate('facebook', { session: false })(req, res);
  };

  const authenticateFacebookCallback = (req, res, next) => {
    passport.authenticate('facebook', { session: false }, async (authErr, facebookData) => {
      try {
        if (authErr) {
          return next(authErr);
        }
        const { profile } = facebookData;
        await handleRegisterUser(req, res, profile);
      } catch (err) {
        return httpHelpers.buildInternalServerErrorResponse(res, err);
      }
    })(req, res, next);
  };

  const authenticateGoogle = (req, res) => {
    passport.authenticate('google', {
      session: false,
      scope: [
        // 'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/plus.me openid email profile'
      ]
    })(req, res);
  };

  const authenticateGoogleCallback = (req, res, next) => {
    passport.authenticate('google', { session: false }, async (authErr, googleData) => {
      try {
        if (authErr) {
          return next(authErr);
        }
        const { profile } = googleData;
        await handleRegisterUser(req, res, profile);
      } catch (err) {
        httpHelpers.buildInternalServerErrorResponse(res, err);
      }
    })(req, res, next);
  };

  const authenticateLinkedin = (req, res) => {
    /* End of field Validation */
    passport.authenticate('linkedin', { session: false, scope: ['r_emailaddress', 'r_basicprofile'] })(req, res);
  };

  const authenticateLinkedinCallback = (req, res, next) => {
    passport.authenticate(
      'linkedin',
      {
        session: false
      },
      async (authErr, linkedinData) => {
        try {
          if (authErr) {
            return next(authErr);
          }
          const { profile } = linkedinData;
          await handleRegisterUser(req, res, profile);
        } catch (err) {
          httpHelpers.buildInternalServerErrorResponse(res, err);
        }
      }
    )(req, res, next);
  };

  const authenticateTwitter = (req, res) => {
    passport.authenticate('twitter', { session: false })(req, res);
  };

  const authenticateTwitterCallback = (req, res, next) => {
    passport.authenticate('twitter', async (authErr, twitterData) => {
      try {
        if (authErr) {
          return next(authErr);
        }
        const { profile } = twitterData;
        await handleRegisterUser(req, res, profile);
      } catch (err) {
        httpHelpers.buildInternalServerErrorResponse(res, err);
      }
    })(req, res, next);
  };

  const logout = (req, res) => {
    req.logout();
    res.redirect('/');
  };

  return {
    signUp,
    authenticateLocal,
    authenticateFacebook,
    authenticateFacebookCallback,
    authenticateGoogle,
    authenticateGoogleCallback,
    authenticateLinkedin,
    authenticateLinkedinCallback,
    authenticateTwitter,
    authenticateTwitterCallback,
    profile,
    logout,
    getAll
  };
};

export default userController;
