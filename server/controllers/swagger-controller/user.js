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
 *          description: enter email & password want to create
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
 * path: /auth/signIn
 * operations:
 *   -  httpMethod: POST
 *      summary: User login
 *      nickname: store
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: body
 *          description: enter username & password
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
 *          description: enter user id
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
 * path: /auth/facebook/validate
 * operations:
 *   -  httpMethod: POST
 *      summary: Validate facebook accesstoken
 *      nickname: store
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: body
 *          description: connect with facebook
 *          paramType: body
 *          required: true
 *          dataType: validate
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
 *        -
 *          code: defaults
 */

/**
 * @swagger
 * path: /auth/google/validate
 * operations:
 *   -  httpMethod: POST
 *      summary: Validate Google accesstoken
 *      nickname: store
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: body
 *          description: connect with google
 *          paramType: body
 *          required: true
 *          dataType: validate
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
 *        -
 *          code: defaults
 */

/**
 * @swagger
 * path: /auth/linkedin/validate
 * operations:
 *   -  httpMethod: POST
 *      summary: Validate Linkedin accesstoken
 *      nickname: store
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: body
 *          description: connect with linkedin
 *          paramType: body
 *          required: true
 *          dataType: validateLinkedin
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
 * 
 *   validate:
 *      id: validate
 *      properties:
 *         access_token:
 *            type: String
 * 
 *   validateLinkedin:
 *      id: validateLinkedin
 *      properties:
 *         code:
 *            type: String

 */

function name(params) {
  return;
}
