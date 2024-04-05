const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Atributos = sequelize.define('Atributos', {
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
  superficie_cubierta: {
    type: DataTypes.STRING,
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
  }
});

module.exports = Atributos;