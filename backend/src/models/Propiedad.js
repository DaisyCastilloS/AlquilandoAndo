const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Propiedad = sequelize.define('Propiedad', {
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
  ubicacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechapublicacion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Propiedad;
