import express from 'express';
import bodyParser from 'body-parser';
import https from 'https';
// All Router of APIs
// import bookRouter from "./server/routes/bookRoute";
import authRouter from './server/routes/authRoute';
import pushRouter from './server/routes/pushRoute';
// import authRouter from './server/routes/authRoute';
import session from 'express-session';
import chalk from 'chalk';
import dotenv from 'dotenv';
import logger from 'morgan';
import expressValidator from 'express-validator';
import expressStatusMonitor from 'express-status-monitor';
import { verifyToken } from './server/helpers/jwtHelper';
import connectMongo from 'connect-mongo';
import mongoose from './server/database/mongoose';
const mongoStore = connectMongo(session);
import cors from 'cors';
import { join, resolve } from 'path';
import authPassport from './server/config/passport';

import path from 'path';
import { readFileSync } from 'fs';
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: 'config.env' });
const port = process.env.PORT || 5011;
const certOptions = {
  // key: readFileSync(resolve("./server/config/fake-certificate/server-key.pem")),
  // cert: readFileSync(resolve("./server/config/fake-certificate/server-cert.pem")),
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
 * Connect to MongoDB.
 */
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    }),
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

/**
 * Allow requests from Angular
 */
app.use(cors());

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
// app.use("/books", bookRouter());
app.use('/auth', authRouter());
app.use('/push', pushRouter());
app.get('/', function(req, res) {
  res.json({ msg: 'You just login as ' + new Date().toUTCString() });
});

/**
 * Start Express server.
 */
// app.listen(port, function(err) {
//   console.log(chalk.blue("Running server on port " + port));
// });

const server = https.createServer(certOptions, app);
server.listen(port, err => {
  console.log(chalk.blue('Running server on port ' + port));
});
