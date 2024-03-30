const { db } = require('../dataBase/db.js');

const dbConnection = async () => {
  try {
    require('../models');

    await db.authenticate();
    db.sync();
    console.log('Conectado a la base de datos');
  } catch (error) {
    console.log('Hubo un error ', error);
  }
};

module.exports = {
  dbConnection,
};
