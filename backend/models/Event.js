const Sequelize = require('sequelize');
const config = require('../config');

const Event = config.define('Event', {
    eventID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    orgID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    eventName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dateFrom : {
        type: Sequelize.DATE,
        allowNull: false
    },
    dateTo: {
        type: Sequelize.DATE,
        allowNull: false
    }
    ,
    addrStreet: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    provState: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
    },
    country: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
    },
    category: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
    },
    summary: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
    },
    details: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
    },
    fees: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0
    },
    capPers: {
        type: Sequelize.SMALLINT,
        allowNull: true,
        defaultValue: 100
    },
    capTodUp: {
        type: Sequelize.SMALLINT,
        allowNull: true,
        defaultValue: 100
    },
    capTodEnf: {
        type: Sequelize.SMALLINT,
        allowNull: true,
        defaultValue: 0
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
    }
}, {timestamps: false});

module.exports = Event;