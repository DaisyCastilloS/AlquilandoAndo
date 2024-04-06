// models/Ubicacion.js

const { DataTypes } = require('sequelize');
const db = require('../dataBase/db');

const Ubicacion = db.define('Ubicacion', {
  address_line: {
    type: DataTypes.STRING,
  },
  neighborhood: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Ubicacion;
