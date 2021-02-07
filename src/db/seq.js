const Sequelize = require('sequelize');

const { MYSQL_CONF } = require('../config/db');

const { host, user, password, database } = MYSQL_CONF;

const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: 'mysql',
  // logging: true
});

module.exports = sequelize;