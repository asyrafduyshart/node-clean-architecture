const request = require('supertest-as-promised');
const container = require('src/container');
const app = container.resolve('app');

module.exports = () => request(app.server.express);
