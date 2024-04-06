const Sequelize = require('sequelize');
const { db } = require('../dataBase');

const Role = db.define('roles', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,

  },
  role: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
});

// Exporting Role model
module.exports = Role;
