const Sequelize = require('sequelize');
const config = new Sequelize('event_trip_manager', 'myRoot', 'password', {dialect: 'mysql'});

module.exports = config;