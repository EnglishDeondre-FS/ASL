const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('spacedb', 'admin', 'admin', {
  host: 'localhost',
  dialect: 'postgres', // or 'mysql', 'sqlite', etc.
});

module.exports = sequelize;
