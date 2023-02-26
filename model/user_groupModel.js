const Sequelize = require('sequelize')
// const User = require('../model/userModel')
// const Group = require('../model/groupModel')

const sequelize = require('../util/database')


const User_Group = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    groupId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = User_Group