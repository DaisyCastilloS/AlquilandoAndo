// desde aca, nuestra app obtendra los datos

const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const ExternalDataSource = sequelize.define('ExternalDataSource', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apiUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = ExternalDataSource;
