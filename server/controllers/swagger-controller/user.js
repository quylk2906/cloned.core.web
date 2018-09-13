/**
 * @swagger
 * resourcePath: /User
 * description: All about API for Priorities
 */

/**
 * @swagger
 * path: /api/v1/auth/users
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
 * path: /api/v1/auth/signUp
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
 * path: /api/v1/auth/users/{id}
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
