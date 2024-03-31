const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize(process.env.NEONTECH_DATABASE_URI, {
  dialect: 'postgres',
  ssl: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = {
  db,
};
