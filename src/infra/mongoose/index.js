const mongoose = require('mongoose');

module.exports = ({ logger }) => {

  const uri = 'mongodb://localhost:37017/user_resto';
  // set mongoose Promise to Bluebird
  mongoose.Promise = Promise;

  // Exit application on error
  mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
  });

  // Exit application on error
  mongoose.connection.on('connected', () => {
    logger.info(`Mongoose default connection is open to ${uri}`);
  });

  // print mongoose logs in dev env
  mongoose.set('debug', true);


  mongoose.connect(uri, {
    keepAlive: 1
  });
  return mongoose.connection;
};