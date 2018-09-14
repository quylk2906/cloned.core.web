import User from '../models/user.model';
import passport from 'passport';
import request from 'request';
import { signToken } from '../helpers/jwtHelper';
import * as httpHelpers from '../helpers/httpResponseHelper';
import { facebookConfig, googleConfig, twitterConfig, linkedinConfig } from '../config/index';

export const findUserByUsername = async username => {
  return await User.findOne({ username: username });
};

const handleRegisterUser = async (req, res, profile) => {
  const username = profile.id || profile.sub;
  let user = await findUserByUsername(username);
  let token = undefined;
  if (user) {
    token = signToken(user);
    return httpHelpers.buildGetSuccessResponse(res, { message: 'The user exists in system.', user, token });
  }
  user = new User({
    // some of keys belong to specified social network.
    username: username,
    fullName: profile.displayName || profile.name,
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
        .checkBody('username', 'Username is not valid email')
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

        return httpHelpers.buildPostSuccessResponse(res, { newUser, token });
      } else {
        return httpHelpers.buildInternalServerErrorResponse(res, err);
      }
    } catch (err) {
      return httpHelpers.buildInternalServerErrorResponse(res, err);
    }
  };

  const profile = async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      if (user) {
        httpHelpers.buildGetSuccessResponse(res, { user });
      } else {
        httpHelpers.buildNotFoundErrorResponse(res, { msg: 'User not found.' });
      }
    } catch (err) {
      httpHelpers.buildInternalServerErrorResponse(res, err);
    }
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

  /** Validate Social Access Token
  Facebook, Google, LinkedIn, Twitter
  */

  const validateFacebook = (req, res) => {
    const PROVIDER = 'facebook';
    const fields = ['id', 'email', 'name'];
    const graphApiUrl = 'https://graph.facebook.com/v3.1/me?fields=' + fields.join(',');
    const params = {
      access_token: req.body.access_token,
      client_id: facebookConfig.clientID,
      client_secret: facebookConfig.clientSecret,
      redirect_uri: facebookConfig.callbackURL
    };
    try {
      if (!req.body.access_token) {
        return httpHelpers.buildValidationErrorResponse(res, { msg: 'Token is required!' });
      }
      // Step 1. Exchange authorization code for access token.
      // Step 2. Retrieve profile information about the current user.
      request.get({ url: graphApiUrl, qs: params, json: true }, async (err, response, profile) => {
        if (response.statusCode !== 200) {
          return httpHelpers.buildInternalServerErrorResponse(res, { message: profile.error.message });
        }
        profile['provider'] = PROVIDER;
        await handleRegisterUser(req, res, profile);
      });
    } catch (err) {
      httpHelpers.buildInternalServerErrorResponse(res, err);
    }
  };

  const validateGoogle = (req, res) => {
    const PROVIDER = 'google';
    const peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    const params = {
      access_token: req.body.access_token,
      client_id: googleConfig.clientID,
      client_secret: googleConfig.clientSecret,
      redirect_uri: googleConfig.callbackURL,
      grant_type: 'authorization_code'
    };
    try {
      if (!req.body.access_token) {
        return httpHelpers.buildValidationErrorResponse(res, { msg: 'Token is required!' });
      }
      // Step 1. Exchange authorization code for access token. (we don't need it)
      // Step 2. Retrieve profile information about the current user.
      request.get({ url: peopleApiUrl, qs: params, json: true }, async (err, response, profile) => {
        if (response.statusCode !== 200) {
          return httpHelpers.buildInternalServerErrorResponse(res, { message: profile.error.message });
        }
        profile['provider'] = PROVIDER;
        await handleRegisterUser(req, res, profile);
      });
    } catch (err) {
      httpHelpers.buildInternalServerErrorResponse(res, err);
    }
  };

  const validateLinkedIn = (req, res) => {
    const PROVIDER = 'linkedin';
    const accessTokenUrl = 'https://www.linkedin.com/uas/oauth2/accessToken';
    const peopleApiUrl = 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address,picture-url)';
    const params = {
      code: req.body.code,
      client_id: linkedinConfig.consumerKey,
      client_secret: linkedinConfig.consumerSecret,
      redirect_uri: 'https://localhost:5011',
      grant_type: 'authorization_code'
    };

    try {
      if (!req.body.code) {
        return httpHelpers.buildValidationErrorResponse(res, { msg: 'Token is required!' });
      }
      // Step 1. Exchange authorization code for access token.
      request.post(accessTokenUrl, { form: params, json: true }, function(err, response, body) {
        console.log('body', body);
        if (response.statusCode !== 200) {
          return res.status(500).send({ message: body.error_description });
        }

        const parms = {
          oauth2_access_token: body.access_token,
          format: 'json'
        };
        // Step 2. Retrieve profile information about the current user.
        request.get({ url: peopleApiUrl, qs: parms, json: true }, function(err, response, profile) {
          console.log('profile', profile);
          if (req.header('Authorization')) {
          }
          // Step 1. Exchange authorization code for access token. (we don't need it)
          // Step 2. Retrieve profile information about the current user.

          // profile['provider'] = PROVIDER;
          // await handleRegisterUser(req, res, profile);
        });
      });
    } catch (err) {
      httpHelpers.buildInternalServerErrorResponse(res, err);
    }
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
    validateFacebook,
    validateGoogle,
    validateLinkedIn,
    profile,
    logout,
    getAll
  };
};

export default userController;
