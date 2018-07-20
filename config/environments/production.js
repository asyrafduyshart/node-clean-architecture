const path = require('path');
const logPath = path.join(__dirname, '../../logs/production.log');

module.exports = {
  web: {
    port: process.env.PORT
  },
  logging: {
    appenders: { cheese: { type: 'file', filename: logPath } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
  }
};