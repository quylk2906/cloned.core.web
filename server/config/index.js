export const RESPONSE_STATUS = {
  VALIDATION_ERROR: 400,
  ENTITY_DUPLICATION_ERROR: 403,
  ENTITY_NOT_FOUND_ERROR: 404,
  INTERNAL_SERVER_ERROR: 500,
  ENTITY_CREATED: 201,
  ENTITY_DELETED: 204,
  UNAUTHORIZED_ERROR: 401
};

export const facebookConfig = {
  clientID: '232539847429376',
  clientSecret: '434d4653185443f26b42742dc7830173',
  callbackURL: '/auth/facebook/callback',
  passReqToCallback: true,
  profileFields: ['id', 'displayName', 'photos', 'email']
  // profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
};

export const googleConfig = {
  clientID: '166487317140-ljektpp265kfbi089rspns7dcgprk7im.apps.googleusercontent.com',
  clientSecret: 'J1KM0ofFGEyI4eMp1gfirPj5',
  callbackURL: '/auth/google/callback',
  profileFields: ['id', 'displayName', 'photos', 'email'],
  passReqToCallback: true
};

export const twitterConfig = {
  consumerKey: 'B4v1L8zqLF66n37pZ5ImAGpKV',
  consumerSecret: '8EuopkNfcfRF4W7PEJ7piYG0zb7zsIAWEWe62MWV42Afu9DiDm',
  callbackURL: '/auth/twitter/callback',
  passReqToCallback: true
};
export const linkedinConfig = {
  consumerKey: '78dxjxrihg9c84',
  consumerSecret: '2GUfUGUpKPVM45DI',
  callbackURL: '/auth/linkedin/callback',
  passReqToCallback: true,
  profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
};

export const smsConfig = {
  accountSid : 'AC9f517396ef5a8ccdf0a147420e606b56',
  authToken : '9be7b54fdea929b8edb5676dac56f6cd',
  fromNumber: '+1 813 547 5750'
}