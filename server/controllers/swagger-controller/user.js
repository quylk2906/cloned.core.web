/**
 * @swagger
 * resourcePath: /User
 * description: All about API for Priorities
 */

/**
 * @swagger
 * path: /auth/users
 * operations:
 *   -  httpMethod: GET
 *      summary: Get all users
 *      nickname: store
 *      consumes:
 *        - text/html
 *      errorResponses:
 *        -
 *          code: 200
 *          reason: OK
 *        -
 *          code: 400
 *          reason: Invalid request params
 *        -
 *          code: 401
 *          reason: Caller is not authenticated
 *        -
 *          code: 404
 *          reason: Resource not found
 */

/**
 * @swagger
 * path: /auth/signUp
 * operations:
 *   -  httpMethod: POST
 *      summary: Register new user
 *      nickname: store
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: body
 *          description: body
 *          paramType: body
 *          required: true
 *          dataType: newUser
 *
 *      errorResponses:
 *        -
 *          code: 200
 *          reason: OK
 *        -
 *          code: 400
 *          reason: Invalid request params
 *        -
 *          code: 401
 *          reason: Caller is not authenticated
 *        -
 *          code: 404
 *          reason: Resource not found
 */

/**
 * @swagger
 * path: /auth/users/{id}
 * operations:
 *   -  httpMethod: GET
 *      summary: Get user profile
 *      nickname: store
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: id
 *          in: path
 *          description: user id
 *          paramType: path
 *          required: true
 *          dataType: string
 *      errorResponses:
 *        -
 *          code: 200
 *          reason: OK
 *        -
 *          code: 400
 *          reason: Invalid request params
 *        -
 *          code: 401
 *          reason: Caller is not authenticated
 *        -
 *          code: 404
 *          reason: Resource not found
 *        -
 *          code: defaults
 */

 /**
 * @swagger
 * path: /auth/facebook 
 * operations:
 *   -  httpMethod: GET
 *      summary: Auth with facebook
 *      nickname: store
 *      consumes:
 *        - text/html
 *      errorResponses:
 *        -
 *          code: 200
 *          reason: OK
 *        -
 *          code: 400
 *          reason: Invalid request params
 *        -
 *          code: 401
 *          reason: Caller is not authenticated
 *        -
 *          code: 404
 *          reason: Resource not found
 *        -
 *          code: defaults
 */

 /**
 * @swagger
 * path: /auth/google 
 * operations:
 *   -  httpMethod: GET
 *      summary: Auth with google
 *      nickname: store
 *      consumes:
 *        - text/html
 *      errorResponses:
 *        -
 *          code: 200
 *          reason: OK
 *        -
 *          code: 400
 *          reason: Invalid request params
 *        -
 *          code: 401
 *          reason: Caller is not authenticated
 *        -
 *          code: 404
 *          reason: Resource not found
 *        -
 *          code: defaults
 */

 /**
 * @swagger
 * path: /auth/twitter 
 * operations:
 *   -  httpMethod: GET
 *      summary: Auth with twitter
 *      nickname: store
 *      consumes:
 *        - text/html
 *      errorResponses:
 *        -
 *          code: 200
 *          reason: OK
 *        -
 *          code: 400
 *          reason: Invalid request params
 *        -
 *          code: 401
 *          reason: Caller is not authenticated
 *        -
 *          code: 404
 *          reason: Resource not found
 *        -
 *          code: defaults
 */

 /**
 * @swagger
 * path: /auth/linkedin 
 * operations:
 *   -  httpMethod: GET
 *      summary: Auth with linkedin
 *      nickname: store
 *      consumes:
 *        - text/html
 *      errorResponses:
 *        -
 *          code: 200
 *          reason: OK
 *        -
 *          code: 400
 *          reason: Invalid request params
 *        -
 *          code: 401
 *          reason: Caller is not authenticated
 *        -
 *          code: 404
 *          reason: Resource not found
 *        -
 *          code: defaults
 */

/**
 * @swagger
 * models:
 *   newUser:
 *     id: newUser
 *     properties:
 *       username:
 *         type: String
 *       password:
 *         type: String

 */

function name(params) {
  return;
}
