

const { DataTypes } = require('sequelize');
const db = require('../dataBase/db');

const Inmueble = db.define('Inmueble', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  condition: {
    type: DataTypes.STRING,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  moneda: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Inmueble;