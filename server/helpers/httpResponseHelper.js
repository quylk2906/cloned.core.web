const SUCCESS = 'success';
const FAIL = 'fail';
const ERROR = 'error';

/* HTTP RESPONSE ERROR CODE */
const VALIDATION_ERROR = 400;
const ENTITY_DUPLICATION_ERROR = 403;
const INTERNAL_SERVER_ERROR = 500;
const SUCCESS_REQUEST = 200;
const ENTITY_NOT_FOUND_ERROR = 404;
const UNAUTHORIZED_ERROR = 401;

const buildGetSuccessResponse = (res, data) => {
  return res.status(SUCCESS_REQUEST).json({
    status: SUCCESS,
    data
  });
};

const buildPostSuccessResponse = (res, data) => {
  return res.status(SUCCESS_REQUEST).json({
    status: SUCCESS,
    data
  });
};

const buildPutSuccessResponse = (res, data) => {
  return res.status(SUCCESS_REQUEST).json({
    status: SUCCESS,
    data
  });
};

const buildDeleteSuccessResponse = (res, data) => {
  return res.status(SUCCESS_REQUEST).json({
    status: SUCCESS,
    data: null
  });
};

const buildValidationErrorResponse = (res, data) => {
  return res.status(VALIDATION_ERROR).json({
    status: FAIL,
    data
  });
};

const buildDuplicationErrorResponse = (res, msg) => {
  return res.status(ENTITY_DUPLICATION_ERROR).json({
    status: FAIL,
    msg
  });
};

const buildNotFoundErrorResponse = (res, msg) => {
  return res.status(ENTITY_NOT_FOUND_ERROR).json({
    status: FAIL,
    data: msg
  });
};

const buildInternalServerErrorResponse = (res, msg) => {
  console.log('error', msg);
  return res.status(INTERNAL_SERVER_ERROR).json({
    status: ERROR,
    message: 'Internal server error. Please contact with administrator',
    msg
  });
};

export {
  buildGetSuccessResponse,
  buildValidationErrorResponse,
  buildDuplicationErrorResponse,
  buildPostSuccessResponse,
  buildInternalServerErrorResponse,
  buildNotFoundErrorResponse,
  buildPutSuccessResponse,
  buildDeleteSuccessResponse
};
