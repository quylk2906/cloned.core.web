import mongoose from 'mongoose';
import dotenv from 'dotenv';
import chalk from 'chalk';
dotenv.load({ path: 'config.env' });
mongoose.Promise = global.Promise;

const options = {
  useNewUrlParser: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

mongoose.set('useFindAndModify', false);

mongoose
  .connect(
    process.env.MONGODB_URI,
    options
  )
  .then(() => {
    console.log(chalk.blue('MongoDB connection is established'));
  })
  .catch(err => {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
  });

const disconnect = function() {
  mongoose.disconnect();
};

export default mongoose;
