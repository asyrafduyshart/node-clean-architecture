const path = require('path');
const logPath = path.join(__dirname, '../../logs/development.log');

module.exports = {
  web: {
    port: 3000
  },
  logging: {
    appenders: { cheese: { type: 'console', filename: logPath } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
  }
};
