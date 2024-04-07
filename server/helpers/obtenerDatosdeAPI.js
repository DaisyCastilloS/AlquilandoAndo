const axios = require('axios');
const fs = require('fs');
const Inmueble = require('../models/Inmueble');

async function obtenerDatosDeMercadoLibre() {
  const url = 'https://api.mercadolibre.com/sites/MLA/search?category=MLA1473&limit=10';

  try {
    const response = await axios.get(url);
    const { data } = response;

    const inmuebles = data.results.map((item) => {
      const attributes = item.attributes.reduce((acc, attr) => {
        switch (attr.name) {
          case 'Dormitorios':
            acc.dormitorios = parseInt(attr.value_name);
            break;
          case 'Baños':
            acc.banos = parseInt(attr.value_name);
            break;
          case 'Ambientes':
            acc.ambientes = parseInt(attr.value_name);
            break;
          case 'Superficie total':
            acc.superficieTotal = parseFloat(attr.value_name);
            break;
          default:
            break;
        }
        return acc;
      }, {});

      return {
        id: item.id,
        titulo: item.title,
        permalink: item.permalink,
        categoriaId: item.category_id,
        currencyId: item.currency_id,
        precio: item.price,
        latitud: item.location ? item.location.latitude : null,
        longitud: item.location ? item.location.longitude : null,
        ...attributes,
      };
    });

    return inmuebles;
  } catch (error) {
    throw new Error('Error al obtener datos de Mercado Libre:', error);
  }
}

async function cargarProductosEnBaseDeDatos() {
  const db = require('../dataBase/db'); // Importa la conexión a la base de datos

  try {
    const inmuebles = await obtenerDatosDeMercadoLibre();

    // Define y sincroniza el modelo Inmueble con la base de datos
    Inmueble.init(db);

    // Sincroniza el modelo con la base de datos
    await db.sync();

    // Inserta o actualiza los inmuebles en la base de datos
    await Promise.all(inmuebles.map(async (inmueble) => {
      await Inmueble.upsert(inmueble);
    }));

    console.log('Datos cargados correctamente en la base de datos');
  } catch (error) {
    console.error('Error al cargar productos en la base de datos:', error);
  } finally {
    // Cierra la conexión de Sequelize
    await db.close();
  }
}

// Llama a la función para cargar productos en la base de datos
cargarProductosEnBaseDeDatos();

