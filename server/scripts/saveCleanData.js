// scripts/saveCleanData.js

const fs = require('fs');
const { obtenerDatosDeMercadoLibre } = require('../helpers/obtenerDatosdeAPI');

async function guardarDatosLimpios() {
  try {
    // Obtener y limpiar los productos de Mercado Libre
    const inmuebles = await obtenerDatosDeMercadoLibre();

    // Guardar los datos limpios en un archivo JSON
    const jsonData = JSON.stringify(inmuebles, null, 2);
    fs.writeFileSync('./datos_limpios.json', jsonData);

    console.log('Datos limpios guardados correctamente en datos_limpios.json');
  } catch (error) {
    console.error('Error al guardar datos limpios:', error);
  }
}

guardarDatosLimpios();
