const { Sequelize } = require('sequelize');
const pg = require('pg');
require('dotenv').config();

const db = new Sequelize(process.env.BD_URL, {
  host: process.env.BD_HOST,
  port: process.env.BD_PORT,
  dialect: 'postgres',
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true, // Require SSL
      rejectUnauthorized: false, // Disable validation of SSL certificates
    },
  },
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
