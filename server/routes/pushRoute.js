import express from 'express';
import pushNotificationController from '../controllers/pushNotificationController';

const pushRouter = express.Router();
const controller = pushNotificationController();

const router = () => {
  pushRouter.route('/singlePush').post(controller.singlePush);
  pushRouter.route('/multiPush').post(controller.multiPush);
  pushRouter.route('/email').post(controller.email);
  pushRouter.route('/sms').post(controller.sms);
  return pushRouter;
};

export default router;
