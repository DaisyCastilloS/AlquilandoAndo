const { Sequelize } = require('sequelize');

const { db } = require('../dataBase/db.js');

const Categoria = db.define('Categoria', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Categoria;
