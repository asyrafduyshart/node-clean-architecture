const Log4js = require('log4js');

module.exports = ({ config }) => {
  Log4js.configure(config.logging);
  let logger = Log4js.getLogger();
  logger.level = "debug"
  return logger;
};
