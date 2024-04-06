const Role = require('./Role');

const Usuarios = require('./Usuario');
const Categoria = require('./Categoria');
const Ubicacion = require('./Ubicacion');
const Inmueble = require('./Inmueble');


// Relaciones

Inmueble.belongsTo(Ubicacion); //un inmueble tiene una ubicacion ok

// Relación entre Categoria e Inmueble
Categoria.hasMany(Inmueble); // Una Categoria tiene muchos Inmuebles
Inmueble.belongsTo(Categoria); // Cada Inmueble pertenece a una Categoria

module.exports = {
  Usuarios,
  Role,
  Categoria,
  Inmueble,
  Ubicacion,
  };
