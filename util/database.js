const Sequelize = require('sequelize')

const sequelize = new Sequelize('chatdb1', 'root', 'aran1234', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize