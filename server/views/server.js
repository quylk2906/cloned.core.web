var cluster = require('cluster');
//
// if (cluster.isMaster) {
//     require('./master');
//     return;
// }
var config = require('./app/config/ngrok');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var methodOverride = require('method-override');
var winston = require('winston');
var expressWinston = require('express-winston');
var agender = require('agenda');
// use the global rotator
var logrotate = require('logrotator');
var rotator = logrotate.rotator;

// init helpers --- CONFIG VARIABLES, SHARED FUNCTIONS
require('./app/helpers/init');

var app = express();

// create log directory
var logDirectory = path.join(__dirname, 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var argv = require('minimist')(process.argv.slice(2));

// app.use(bodyParser());

app.use(express.static(path.join(__dirname, 'swagger')));

app.all('/*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});
//add swagger in nodejs
var swagger = require('swagger-express');
app.use(swagger.init(app, {
	apiVersion: '1.0',
	swaggerVersion: '1.0',
	basePath:process.env.BASEPATH,
	swaggerURL: '/api-docs',
	swaggerJSON: '/api-docs.json',
	swaggerUI: __dirname+'/swagger/',
	apis: ['./app/controllers/auth.js',
         './app/controllers/priorities.js',
         './app/controllers/templates.js',
         './app/controllers/admin.js',
         // './app/controllers/users.js',
         './app/controllers/groupUser.js',
         // './app/controllers/messages-backup.js',
         './app/controllers/messages.js',
         './app/controllers/logoCompany.js',
         // './app/controllers/crds.js',
         './app/controllers/schedules.js',
         './app/controllers/companies.js',
         './app/controllers/websites.js',
         './app/controllers/recipients.js',
         './app/controllers/groups.js',
         './app/controllers/responses.js',
         './app/controllers/payments.js',
         './app/controllers/voiceCast.js']

}));

// Middleware to configure dynamic base URL (root URL) for constants
app.use(function(req, res, next) {
    var configs = null; /*_.getConfigsBaseURL(req);*/
    if (_.isObject(configs)) {
        global.constants = require(__dirname + '/app/helpers/constants').initConstants(configs);
    }
    next();
});

var server = require('http').Server(app);
var routes = require('./app/routes/index');

/**
 * View engine setup
 */
app.engine('hbs', require('express-hbs').express4({
    defaultLayout: __dirname + '/app/templates/layout/default.hbs',
    partialsDir: __dirname + '/app/templates/layout/partials',
    layoutDir: __dirname + '/app/templates/layout',
    extname: '.hbs'
}));

// configure views path
app.set('view engine', 'hbs');
app.set('views', __dirname + '/app/templates');

/**
 * Handle Request log to file
 */
// in production, create a access.log file
if (process.env.NODE_ENV === 'production') {
    var logPath = path.join(__dirname, '/logs/access.log');
    var accessLogStream = fs.createWriteStream(logPath, {flags: 'a'});
    app.use(logger('combined', {stream: accessLogStream}));

    // check file rotation every 30 minutes, and rotate the file if its size exceeds 10 mb.
    // keep only 3 rotated files and compress (gzip) them.
    rotator.register(logPath, {schedule: '30m', size: '10m', compress: true, count: 3});

    rotator.on('error', function(err) {
        console.log('oops, an error occured!');
    });

    // 'rotate' event is invoked whenever a registered file gets rotated
    rotator.on('rotate', function(file) {
        console.log('File ' + file + ' was rotated!');
    });
}

/**
 * Middlewares
 */
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('X-HTTP-Method-Override'));
// CORS middleware
// app.use(uploadFile());
app.use(function (req, res, next) {
	var value = req.get('referer');
	
	if (!value) {
		value = req.get('origin');
	}
	
	if (value) {
		constants.CORS_WHITE_LIST.forEach(function(val, key){
			if (value.indexOf(val) > -1) {
				var validOrigin = _.getHttpAndHost(value);
				console.log('Set Access-Control-Allow-Origin to ' + validOrigin);
				res.setHeader('Access-Control-Allow-Origin', validOrigin);
			}
		});
	}
	
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, REST-API-KEY-HEADER, x-auth-token, switch-company-id');
	
	// intercept OPTIONS method
	if ('OPTIONS' == req.method) {
		res.sendStatus(200);
	}
	else {
		next();
	}
});


/**
 * Middlewares (Filters)
 */
var middlewareIsAuthenticated = require(__dirname + '/app/lib/init').auth.isAuthenticated;

//initialize all version router for API
var v1 = express.Router();

/**
 * Routes
 */
v1.use('/', routes.root);
v1.use('/users', routes.users);
v1.use('/admin', routes.admin);
v1.use('/auth', routes.auth);
v1.use('/groups', routes.groups);
v1.use('/logo', routes.logoCompany);
v1.use('/messages', routes.messages);
v1.use('/groupuser', routes.groupUser);
v1.use('/priorities', routes.priorities);
v1.use('/templates', routes.templates);
v1.use('/recipients', routes.recipients);
v1.use('/users/devices', routes.userDevices);
v1.use('/crds', routes.crds);
v1.use('/schedules', routes.schedules);
v1.use('/companies', routes.companies);
v1.use('/voiceCast', routes.voiceCast);
v1.use('/websites', routes.websites);
v1.use('/responses', routes.responses);
v1.use('/payments', routes.payments);

// use version API and set default version
app.use("/api/v1", v1);
app.use("/", v1);

// Static routes
app.use('/avatar_images/', express.static(path.join(__dirname, 'persisted_storage/avatar')));
app.use('/image_websites/', express.static(path.join(__dirname, 'persisted_storage/websites')));


/**
 * Error handlers
 */

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     // util.inspect(req.method, false, null)
//     var err = new Error('Not Found: ' + req.method + ' ' + req.originalUrl);
//     err.statusCode = 404;
//     next(err);
// });

// app.get('/upload', function (req, res) {
//
// 	res.sendFile(__dirname + '/upload.html');
// });
// development error handler
// will print stacktrace
app.use(function (err, req, res, next) {

    var requestUrl = path.basename(req.url);
    var extension = path.extname( requestUrl );
    if( !extension ){
        if (err.stack) {
            console.log(err, err.stack.split("\n")); // Easier to read stacktrace
        }
        if (err) {
            varLog('ERROR:', err);
        }
    }
    res.status(err.statusCode || 500);
    next(err);
});

// write error log file in production mode
if (process.env.NODE_ENV === 'production') {
    app.use(expressWinston.errorLogger({
        transports: [
            new winston.transports.File({
                filename: path.join(__dirname, '/logs/errors.log'),
                json: true
            })
        ],
        msg: 'ERROR: {{res.statusCode}} {{req.method}} {{req.url}}',
    }));
}


// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	console.log("error");
	console.log(err);
    res.status(err.statusCode || 500);
    res.json(err);
});

server.listen(5015, function () {
    console.log('Listening on port %d', this.address().port);
});
module.exports = app;
