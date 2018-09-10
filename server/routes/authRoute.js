import express from 'express';
import userController from '../controllers/userController';

const authRouter = express.Router();
const controller = userController();

const router = () => {
  authRouter.route('/').get(controller.getAll);

  authRouter.route('/signUp').post(controller.signUp);

  authRouter.route('/signIn').post(controller.authenticateLocal);

  authRouter.route('/facebook').get(controller.authenticateFacebook);

  authRouter.route('/facebook/callback').get(controller.authenticateFacebookCallback);

  authRouter.route('/google').get(controller.authenticateGoogle);

  authRouter.route('/google/callback').get(controller.authenticateGoogleCallback);

  authRouter.route('/linkedin').get(controller.authenticateLinkedin);

  authRouter.route('/linkedin/callback').get(controller.authenticateLinkedinCallback);

  authRouter.route('/profile').get(controller.profile);

  authRouter.route('/logout').get(controller.logout);

  return authRouter;
};

export default router;
