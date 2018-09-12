import twilio from 'twilio';
import * as httpHelpers from '../helpers/httpResponseHelper';
import nodeMailer from '../../server/api/nodemailer/index.js';
import {smsConfig} from '../config/index';

import {
  initializeApp,
  credential as _credential,
  messaging
} from 'firebase-admin';

// import serviceAccount from '../assets/tasty-d5d32-firebase-adminsdk-pc0ys-874e1cea47.json';
const serviceAccount = require('../assets/tasty-d5d32-firebase-adminsdk-pc0ys-874e1cea47.json');

var admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tasty-d5d32.firebaseio.com'
});
const TIME_TO_LIVE = 0;
const hanldePush = async (req, res) => {
  const {
    body
  } = req;
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
    return httpHelpers.buildPostSuccessResponse(res, {
      rs
    });
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
    httpHelpers.buildGetSuccessResponse(res, {
      msg: 'Login with facebook successfully'
    });
  };

  const sms = async (req, res) => {
    const {accountSid, authToken, fromNumber} = smsConfig; 
    const client = new twilio (accountSid, authToken);
    const { reciveNumber } = req.body;
    try {
      if (!reciveNumber) {
        return httpHelpers.buildNotFoundErrorResponse(res, {
          msg: 'Can not find a phone number to send notify'
        });
      }
      client.messages
        .create({
          body: 'Hello there! This is an sms send from core.nodejs',
          from: fromNumber,
          to: reciveNumber //+841686326507 valid phone number
        })
        .then(message => console.log(message.sid))
        .done(httpHelpers.buildPostSuccessResponse(res, {
          msg: 'Sms send successfull'
        })); 
    } catch (err) {
      return httpHelpers.buildInternalServerErrorResponse(res);
    }
  };

  const email = async (req, res) => {
    try {
      const {
        email,
        useTemplate
      } = req.body;
      if (!email) {
        return httpHelpers.buildNotFoundErrorResponse(res, {
          msg: 'Can not find email to send'
        });
      }
      await nodeMailer({
        email,
        useTemplate
      });
      httpHelpers.buildPostSuccessResponse(res, {
        msg: 'Email send successfull'
      });
    } catch (err) {
      return httpHelpers.buildInternalServerErrorResponse(res);
    }
  };
  return {
    singlePush,
    multiPush,
    email,
    sms
  };
};

export default pushNotificationController;
