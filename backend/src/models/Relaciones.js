// models/index.js

const Inmueble = require('./Inmueble');
const Atributos = require('./Atributo');
const Ubicacion = require('./Ubicacion');

// Relaciones
Inmueble.hasMany(Atributos); // un inmueble tiene muchos atributos ok 
Atributos.belongsTo(Inmueble); //atributos pertenecen a un inmueble ok

Inmueble.belongsTo(Ubicacion); //un inmueble tiene una ubicacion ok


module.exports = {
Inmueble,
  Atributos,
  Ubicacion,
};
