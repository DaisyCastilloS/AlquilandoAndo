// models/index.js

const Inmueble = require('./Inmueble');
const Ubicacion = require('./Ubicacion');

// Relaciones

Inmueble.belongsTo(Ubicacion); //un inmueble tiene una ubicacion ok

// Relación entre Categoria e Inmueble
Categoria.hasMany(Inmueble); // Una Categoria tiene muchos Inmuebles
Inmueble.belongsTo(Categoria); // Cada Inmueble pertenece a una Categoria


module.exports = {
Inmueble,
  Ubicacion,
};
