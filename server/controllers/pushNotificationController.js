import * as httpHelpers from '../helpers/httpResponseHelper';

import { initializeApp, credential as _credential, messaging } from 'firebase-admin';

// import serviceAccount from '../assets/tasty-d5d32-firebase-adminsdk-pc0ys-874e1cea47.json';
const serviceAccount = require('../assets/tasty-d5d32-firebase-adminsdk-pc0ys-874e1cea47.json');

var admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tasty-d5d32.firebaseio.com'
});
const TIME_TO_LIVE = 0;
const hanldePush = async (req, res) => {
  const { body } = req;
  const deviceToken = body.deviceToken;
  const payload = {
    data: body.data || {}
  };
  console.log('payload', payload);
  const options = {
    priority: body.priority || 'high',
    timeToLive: body.time_to_live || TIME_TO_LIVE
  };

  try {
    const rs = await admin.messaging().sendToDevice(deviceToken, payload, options);
    console.log('Successfullt sent message: ', rs);
    return httpHelpers.buildPostSuccessResponse(res, { rs });
  } catch (error) {
    console.log('Error sending message: ', error);
    return httpHelpers.buildInternalServerErrorResponse(res);
  }
};

const pushNotificationController = () => {
  const singlePush = async (req, res) => {
    await hanldePush(req, res);
  };

  const multiPush = async (req, res) => {
    console.log('req.userData', req.userData);
    httpHelpers.buildGetSuccessResponse(res, { msg: 'Login with facebook successfully' });
  };

  return {
    singlePush,
    multiPush
  };
};

export default pushNotificationController;
