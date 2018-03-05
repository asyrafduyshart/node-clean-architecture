const path = require('path');
const logPath = path.join(__dirname, '../../logs/test.log');

module.exports = {
  web: {},
  logging: {
    appenders: { cheese: { type: 'console', filename: logPath } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
  }
};
