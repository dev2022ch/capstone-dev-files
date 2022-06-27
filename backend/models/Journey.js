const Sequelize = require('sequelize');
const config = require('../config');

const Journey = config.define('Journey', {
    journeyID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {timestamps: false});

module.exports = Journey;