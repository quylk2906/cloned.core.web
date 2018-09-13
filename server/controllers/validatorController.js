import passport from 'passport';
import request from 'request';
const qs = require('querystring');
import User from '../models/user.model';
import { signToken } from '../helpers/jwtHelper';
import * as httpHelpers from '../helpers/httpResponseHelper';


const validatorController = () => {
  const validateFacebook = (req, res, next) => {
    const accesstoken = req.body.accesstoken;
    var fields = ['id', 'name', 'email'];
    var graphApiUrl = 'https://graph.facebook.com/v3.1/me?fields=' + fields.join(',');
    try {
      if(!accesstoken) {
        return httpHelpers.buildValidationErrorResponse(res, { msg: 'Token require!' });
      }
      request.get({ url: graphApiUrl, accesstoken: accesstoken , json: true}, (error, response, profile) => {
        // if(response.statusCode !==200) {
        //   return httpHelpers.buildValidationErrorResponse(res, error);
        // }
        // console.log(response);
        res.send(error)
        console.log(profile);
      })
    } catch (err) {
      // console.log(err.message);
      return httpHelpers.buildInternalServerErrorResponse(res, err);      
    }
  };

  return {
    validateFacebook,
  }
}
export default validatorController;
