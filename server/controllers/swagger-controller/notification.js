/**
 * @swagger
 * resourcePath: /Notification
 * description: All about API for Priorities
 */

 /**
    * @swagger
    * path: /push/singlePush
    * operations:
    *   -  httpMethod: POST
    *      summary: Single notification
    *      nickname: store
    *      consumes:
    *        - text/html
    *      parameters:
    *        - name: body
    *          description: body
    *          paramType: body
    *          required: true
    *          dataType: notification
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
    * path: /push/multiPush
    * operations:
    *   -  httpMethod: POST
    *      summary: MultiPush notification
    *      nickname: store
    *      consumes:
    *        - text/html
    *      parameters:
    *        - name: body
    *          description: body
    *          paramType: body
    *          required: true
    *          dataType: notification
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
    * path: /push/email
    * operations:
    *   -  httpMethod: POST
    *      summary: Assign for email notification
    *      nickname: store
    *      consumes:
    *        - text/html
    *      parameters:
    *        - name: body
    *          description: body
    *          paramType: body
    *          required: true
    *          dataType: emailNotification
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
    * path: /push/sms
    * operations:
    *   -  httpMethod: POST
    *      summary: Assign for sms notification
    *      nickname: store
    *      consumes:
    *        - text/html
    *      parameters:
    *        - name: body
    *          description: body
    *          paramType: body
    *          required: true
    *          dataType: smsNotification
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
 * models:
 *   notification:
 *     id: notification
 *     properties:
 *       deviceToken:
 *          type: string
 *          description: deviceToken
 *          default: "xxxx"  
 *       collapse_key:
 *          type: String
 *       time_to_live:
 *          type: String
 *       delayWhileIdle:
 *          type: Boolean   
 *       data:
 *          type: Object
 *          required: 
 *              - click_action
 *              - openURL
 *          properties:
 *              click_action:
 *                type: String
 *              openURL:
 *                type: String
 *              title:
 *                type: String
 *              message:
 *                type: String
 *              content-available:
 *                type: Integer
 *              content:
 *                type: String
 *              badge:
 *                type: String
 *              priority:
 *                type: String
 *              soundname:
 *                type: String
 *   smsNotification:
 *     id: smsNotification
 *     properties:
 *       reciveNumber:
 *         type: String
 *       content:
 *         type: String
 * 
 *   emailNotification:
 *     id: emailNotification
 *     properties:
 *       email:
 *         type: String
 * 
 */
