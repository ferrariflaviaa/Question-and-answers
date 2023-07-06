const Sequelize = require('sequelize')

const connection = new Sequelize('guiaperguntas', 'root', '123456', {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false,
  port: 3312
})

module.exports = connection;