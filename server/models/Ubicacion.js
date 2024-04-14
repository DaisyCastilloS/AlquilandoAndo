// models/Ubicacion.js

const { Sequelize } = require('sequelize');
const { db } = require('../dataBase/db.js');

const Ubicacion = db.define('Ubicacion', {
  address_line: {
    type: Sequelize.STRING,
  },
  neighborhood: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

module.exports = Ubicacion;
