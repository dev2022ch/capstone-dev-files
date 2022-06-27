const Sequelize = require('sequelize');
const config = require('../config');

const Registration = config.define('Registration', {
    regID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    eventID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    dateAction : {
        type: Sequelize.DATE,
        allowNull: false
    },
    numPers: {
        type: Sequelize.SMALLINT,
        allowNull: true,
        defaultValue: 0
    },
    numAdults: {
        type: Sequelize.SMALLINT,
        allowNull: true,
        defaultValue: 0
    },
    numTodUp: {
        type: Sequelize.SMALLINT,
        allowNull: true,
        defaultValue: 0
    },
    numTodEnf: {
        type: Sequelize.SMALLINT,
        allowNull: true,
        defaultValue: 0
    },
    msgByGoer: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
    },
    noteByOrg: {
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


module.exports = Registration;