import express from 'express';
import userController from '../controllers/userController';
const authRouter = express.Router();
const controller = userController();

const router = () => {
  authRouter.route('/users').get(controller.getAll);

  authRouter.route('/signUp').post(controller.signUp);

  authRouter.route('/signIn').post(controller.authenticateLocal);

  authRouter.route('/facebook').get(controller.authenticateFacebook);

  authRouter.route('/facebook/callback').get(controller.authenticateFacebookCallback);

  authRouter.route('/facebook/validate').post(controller.validateFacebook);

  authRouter.route('/google').get(controller.authenticateGoogle);

  authRouter.route('/google/callback').get(controller.authenticateGoogleCallback);

  authRouter.route('/google/validate').post(controller.validateGoogle);

  authRouter.route('/linkedin').get(controller.authenticateLinkedin);

  authRouter.route('/linkedin/callback').get(controller.authenticateLinkedinCallback);

  authRouter.route('/linkedin/validate').post(controller.validateLinkedIn);

  authRouter.route('/twitter').get(controller.authenticateTwitter);

  authRouter.route('/twitter/callback').get(controller.authenticateTwitterCallback);

  authRouter.route('/users/:id').get(controller.profile);

  authRouter.route('/logout').get(controller.logout);

  return authRouter;
};

export default router;
