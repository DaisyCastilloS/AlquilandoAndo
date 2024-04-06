const axios = require('axios');
const ExternalDataSource = require('../models/ExternalDataSource.js');

module.exports = {
  // Otras funciones del controlador...

  ConsumirAPIdeMercadoLibre: async (req, res) => {
    try {
      // Hacer una solicitud a la API de Mercado Libre
      const response = await axios.get('URL_DEL_ENDPOINT_DE_MERCADO_LIBRE');
      const datos = response.data;

      // Almacenar los datos en la base de datos
      await ExternalDataSource.create({
        nombre: 'Mercado Libre',
        apiUrl: 'URL_DEL_ENDPOINT_DE_MERCADO_LIBRE',
        datos, // Almacena los datos de la API de Mercado Libre en la base de datos
      });

      res
        .status(200)
        .json({ message: 'Datos de Mercado Libre almacenados exitosamente' });
    } catch (error) {
      console.error('Error al consumir la API de Mercado Libre:', error);
      res
        .status(500)
        .json({ error: 'Error al consumir la API de Mercado Libre' });
    }
  },
};
