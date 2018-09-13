/**
 * @swagger
 * resourcePath: /Priorities
 * description: All about API for Priorities
 */

/**
 * @swagger
 * path: /priorities
 * operations:
 *   -  httpMethod: POST
 *      summary: create a priority
 *      nickname: store
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: body
 *          description: body
 *          paramType: body
 *          required: true
 *          dataType: newPriority
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
 * path: /priorities
 * operations:
 *   -  httpMethod: GET
 *      summary: show list priorities of owner
 *      nickname: list
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: id
 *          in: path
 *          description: priority id
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
 *
 */

/**
 * @swagger
 * path: /priorities/{id}
 * operations:
 *   -  httpMethod: GET
 *      summary: get priority by id
 *      nickname: list
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: id
 *          in: path
 *          description: priority id
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
 *
 */

/**
 * @swagger
 * path: /priorities/{id}
 * operations:
 *   -  httpMethod: PUT
 *      summary: update a priority
 *      nickname: update
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: body
 *          description: body
 *          paramType: body
 *          required: true
 *          dataType: updatePriority
 *        - name: id
 *          in: path
 *          description: priority id
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
 */

/**
 * @swagger
 * path: /priorities/{id}
 * operations:
 *   -  httpMethod: DELETE
 *      summary: delete a priority
 *      nickname: delete
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: id
 *          in: path
 *          description: priority id
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
 *
 */

/**
 * @swagger
 * models:
 *   newPriority:
 *     id: newPriority
 *     properties:
 *       name:
 *         type: String
 *       description:
 *         type: String

 *   updatePriority:
 *     id: updatePriority
 *     properties:
 *       name:
 *         type: String
 */

function name(params) {
  return;
}
