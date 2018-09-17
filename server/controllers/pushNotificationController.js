import twilio from 'twilio';
import * as httpHelpers from '../helpers/httpResponseHelper';
import nodeMailer from '../../server/api/nodemailer/index.js';
import { smsConfig } from '../config/index';
import { initializeApp, credential as _credential, messaging } from 'firebase-admin';

// import serviceAccount from '../assets/tasty-d5d32-firebase-adminsdk-pc0ys-874e1cea47.json';
const serviceAccount = require('../assets/tasty-d5d32-firebase-adminsdk-pc0ys-874e1cea47.json');

const admin = require('firebase-admin');
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
    await hanldePush(req, res);
  };

  const sms = async (req, res) => {
    const { accountSid, authToken, fromNumber } = smsConfig;
    const client = new twilio(accountSid, authToken);
    const { reciveNumber, content } = req.body;
    try {
      if (!reciveNumber && !content) {
        httpHelpers.buildNotFoundErrorResponse(res, {
          msg: 'Can not find a phone number to send notify.'
        });
      }
      client.messages.create(
        {
          to: reciveNumber, //+841686326507 valid phone number
          body: content,
          from: fromNumber
        },
        (err, data) => {
          if (err) {
            return res.status(404).send({ send: false, message: err.message });
          } else {
            httpHelpers.buildPostSuccessResponse(res, {
              msg: 'Sms send successfull'
            });
          }
        }
      );
    } catch (err) {
      httpHelpers.buildInternalServerErrorResponse(res);
    }
  };

  const email = async (req, res) => {
    try {
      const { email, useTemplate } = req.body;
      if (!email) {
        httpHelpers.buildNotFoundErrorResponse(res, {
          msg: 'Can not find email to send'
        });
      }
      const rs = await nodeMailer(
        {
          email
        },
        true
      );
      httpHelpers.buildPostSuccessResponse(res, {
        msg: 'Email send successfull',
        rs
      });
    } catch (err) {
      httpHelpers.buildInternalServerErrorResponse(res);
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
