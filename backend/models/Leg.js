const Sequelize = require('sequelize');
const config = require('../config');

const Leg = config.define('Leg', {
    legID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    journeyID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    regID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    tripFrom: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    dateFrom : {
        type: Sequelize.DATE,
        allowNull: true
    },
    tripTo: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    dateTo : {
        type: Sequelize.DATE,
        allowNull: true
    },
    transMode: {
        type: Sequelize.TINYINT,
        allowNull: true,
        defaultValue: 0
    },
    costTrans: {
        type: Sequelize.SMALLINT,
        allowNull: true,
        defaultValue: 0
    },
    OWRndTrip: {
        type: Sequelize.TINYINT,
        allowNull: true,
        defaultValue: true
    },
    addrAccomd: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
    },
    dateStayStart : {
        type: Sequelize.DATE,
        allowNull: true
    },
    dateStayEnd : {
        type: Sequelize.DATE,
        allowNull: true
    },
    accomType: {
        type: Sequelize.TINYINT,
        allowNull: true,
        defaultValue: 0
    },
    costAccomd: {
        type: Sequelize.SMALLINT,
        allowNull: true,
        defaultValue: 0
    }
}, {timestamps: false});

module.exports = Leg;