const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Member = sequelize.define('member', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING 
    },
    admin: {
        type: Sequelize.BOOLEAN
    },
    userId: {
        type: Sequelize.INTEGER
    }
})

module.exports = Member