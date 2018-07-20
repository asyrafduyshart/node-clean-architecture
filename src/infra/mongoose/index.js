const mongoose = require('mongoose');

module.exports = ({ logger, config }) => {
  let uri = process.env.DATABASE_URL;
  // if (config.env === 'development'){
  //   const { username, password, database, host, port, dialect } = config.db;
  //   uri = `${dialect}://${username}:${password}@${host}:${port}/${database}`;
  // }

  console.log(uri);
  // set mongoose Promise to Bluebird
  mongoose.Promise = Promise;

  // Exit application on error
  mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB connection error: ${err}`);
    process.exit(1);
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