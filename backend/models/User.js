const Sequelize = require('sequelize');
const config = require('../config');

const User = config.define('User', {
    userID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    passWord: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
   },
    phone: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
   },
   image: {
       type: Sequelize.STRING,
       allowNull: true,
       defaultValue: ''
   }
}, {timestamps: false});

module.exports = User;