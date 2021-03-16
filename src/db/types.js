/**
 * @description 封装sequelizes数据类型
 */

const Sequelize = require('sequelize');

module.exports = {
  STRING: Sequelize.STRING,
  DECIMAL: Sequelize.DECIMAL,
  TEXT: Sequelize.TEXT,
  INTEGER: Sequelize.INTEGER,
  FLOAT: Sequelize.FLOAT,
  BOOLEAN: Sequelize.BOOLEAN
}