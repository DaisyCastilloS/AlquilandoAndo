const { DataTypes } = require('sequelize');
const db = require('../dataBase/db');

const Inmueble = db.define('Inmueble', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  dormitorios: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  baños: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ambientes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  superficie_total: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ubicacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Inmueble;
