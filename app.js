import express from 'express';
import bodyParser from 'body-parser';
import https from 'https';
// All Router of APIs
// import bookRouter from "./server/routes/bookRoute";
import authRouter from './server/routes/authRoute';
import pushRouter from './server/routes/pushRoute';

import chalk from 'chalk';
import dotenv from 'dotenv';
import logger from 'morgan';
import expressValidator from 'express-validator';
import expressStatusMonitor from 'express-status-monitor';
import { verifyToken } from './server/helpers/jwtHelper';
import session from 'express-session';
// import connectMongo from 'connect-mongo';
// import mongoose from './server/database/mongoose';
// const mongoStore = connectMongo(session);

import authPassport from './server/config/passport';
import cors from 'cors';
import { init } from 'swagger-express';
import { join, resolve } from 'path';
import { readFileSync } from 'fs';
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: 'config.env' });
const port = process.env.PORT || 5011;

const certOptions = {
  key: readFileSync(resolve('./server/config/fake-certificate/server.key')),
  cert: readFileSync(resolve('./server/config/fake-certificate/server.cert'))
  // requestCert: false,
  // rejectUnauthorized: false
};
/**
 * Create Express server.
 */
const app = express();

/**
 * Settings up viewengine.
 */
app.set('views', join(__dirname, 'views'));

/**
 * Integrate Swagger to Node App.
 */
const options = {
  apiVersion: '1.0',
  swaggerVersion: '1.0',
  basePath: process.env.BASEPATH || 'http://localhost:5011',
  swaggerURL: '/explorer',
  swaggerJSON: '/api-docs.json',
  swaggerUI: './server/views/swagger',
  apis: ['./server/controllers/swagger-controller/user.js', './server/controllers/swagger-controller/notification.js']
};

app.use(init(app, options));

/**
 * Connect to MongoDB.
 */

import './server/database/mongoose';

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    // store: new mongoStore({
    //   mongooseConnection: mongoose.connection
    // }),
    cookie: {
      maxAge: 180 * 60 * 1000
    }
  })
);

/**
 * Express configuration.
 */
app.use(expressStatusMonitor());
app.use(logger('dev'));
app.use(
  bodyParser.json({
    /*limit: '50mb' */
  })
);
app.use(bodyParser.urlencoded({ /*limit: '50mb', */ extended: true }));
app.use(expressValidator());

/**
 * Allow requests from Angular
 */
app.use(cors());

/**
 if (process.env.NODE_ENV === 'production') {
 } else {
   
 }
 */

/**
 * Passport configuration.
 */
// require("./server/config/passport")(app);

authPassport(app);
/**
 * Protect authorized routes.
 */
// app.use(verifyToken);

/**
 * Primary app routes.
 */

// use version API and set default version
const v1 = express.Router();
v1.use('/auth', authRouter());
v1.use('/push', pushRouter());
// app.use('/api/v1', v1);
app.use('/', v1);
app.get('/', function(req, res) {
  res.json({ msg: 'You just login as ' + new Date().toUTCString() });
});

/**
 * Start Express server.
 */
app.listen(port, function(err) {
  console.log(chalk.blue('Running server on port ' + port));
});

// const server = https.createServer(certOptions, app);
// server.listen(port, err => {
//   console.log(chalk.blue('Running server on port ' + port));
// });
