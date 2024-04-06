// models/index.js

const Inmueble = require('./Inmueble');
const Ubicacion = require('./Ubicacion');

// Relaciones

Inmueble.belongsTo(Ubicacion); //un inmueble tiene una ubicacion ok


module.exports = {
Inmueble,
  Ubicacion,
};
