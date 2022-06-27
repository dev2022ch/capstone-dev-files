const Sequelize = require('sequelize');
const config = require('../config');

const Contact = config.define('Contact', {
    relationID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    contactUserID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    contactUserName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    reqDirection: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    msgRequest: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
    },
    status: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0
    }

}, {timestamps: false});

module.exports = Contact;