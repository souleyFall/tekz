const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.db_name, process.env.user, process.env.password, {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;