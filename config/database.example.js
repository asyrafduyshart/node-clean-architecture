//Use this template and remove example fro your own environtment

module.exports = {
    development: {
      username: 'foouser',
      password: 'foopwd',
      database: 'admin',
      host: '127.0.0.1',
      port: '27017',
      dialect: 'mongodb'
    },
    test: {
      username: 'root',
      password: null,
      database: 'boilerplate_test',
      host: '127.0.0.1',
      dialect: 'postgres',
      logging: null
    },
    production: process.env.DATABASE_URL
};