const { db } = require('../dataBase/db.js');

const dbConnection = async () => {
  try {
    await db.authenticate();
    db.sync();
  } catch (error) {
    throw new Error('No se pudo establecer la conexión con la base de datos');
  }
};

module.exports = {
  dbConnection,
};
