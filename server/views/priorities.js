var q = require('q');
var lib = require(process.cwd() + '/app/lib/init');
var PriorityModel = new mongo.priorities;
/**
 * @swagger
 * resourcePath: /Priorities
 * description: All about API for Priorities
 */
var extendMethods = {
    create:create,
    getByOwner: getByOwner,
    getById: getById,
    updateById: updateById,
    deleteById: deleteById,
};
module.exports = _.extend( extendMethods);
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
function create(req, res, next) {
    var defer = q.defer();
    var data = req.body;
    var userId = _.getUserIdOrSwitchId(req);
    if(!_.isObject(data)){
        defer.reject(errorHandler.badRequest('Invalid parameters!'));
    }else{
        data.owner = userId;
        PriorityModel
            .create(data)
            .then(function (result) {
                defer.resolve(result);
            })
            .catch(function(err) {
                defer.reject(err);
            });

    }
    return defer.promise;
}
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
function getByOwner(req, res, next ) {
    var defer = q.defer();
    var userId = _.getUserIdOrSwitchId(req);
    PriorityModel
        .getByOwner(userId)
        .then(function (result) {
            if(!result || result.length === 0){
                createDefaultPriorityList(req).then(function(defaultList){
                   defer.resolve(defaultList);
                }).catch(function(err){
                    defer.reject(err);
                });
            }else{
                defer.resolve(result);
            }
        })
        .catch(function(err) {
            defer.reject(err);
        });
    return defer.promise;
}

function createDefaultPriorityList(req){
    var defer = q.defer();
    var userId = req.decoded.body.sub;
    var promises = [];
    var defaultPriorityList = ["**SAFETY ALERT**","*ASSISTANCE*", "*EVENT*", "*REMINDER*", "*INQUIRY*", "*PRAYERS*", "*CODE BLUE*", "Notice"];
    _.each(defaultPriorityList, function(item){
        var objData = {
          name: item,
          owner: userId
        };
        promises.push(PriorityModel.create(objData));
    });
    q.all(promises).then(function(result){
        PriorityModel.getByOwner(userId).then(function(priorities){
            defer.resolve(priorities);
        }).catch(function(err){
            defer.reject(errorHandler.mongooseErrorHandler(err));
        });
    }).catch(function(err){
        defer.reject(errorHandler.notFound(err));
    });
    return defer.promise;
}
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
function getById(req, res, next ) {
    var defer = q.defer();
    var id = req.params.id;
    PriorityModel
        .getById(id)
        .then(function (result) {
            defer.resolve(result);
        })
        .catch(function(err) {
            defer.reject(err);
        });
    return defer.promise;
}
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
function updateById(req, res, next ) {
    var defer = q.defer();
    var id = req.params.id;
    var data = req.body;
    PriorityModel
        .updateById(id, data)
        .then(function (result) {
            defer.resolve(result);
        })
        .catch(function(err) {
            defer.reject(err);
        });
    return defer.promise;
}
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
function deleteById(req, res, next ) {
    var defer = q.defer();
    var id = req.params.id;
    var data = req.body;
    PriorityModel
        .delete(id, data)
        .then(function (result) {
            defer.resolve(result);
        })
        .catch(function(err) {
            defer.reject(err);
        });
    return defer.promise;
}


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