const { DataTypes } = require('sequelize');
const db = require('../dataBase/db');

const Categoria = db.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Categoria;
