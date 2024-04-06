const adminSwagger = {
    paths: {
      '/admin/users': {
        get: {
          summary: 'Obtener todos los usuarios (admin)',
          responses: {
            200: {
              description: 'Éxito: devuelve todos los usuarios',
              content: {
                'application/json': {
                  schema: {
                    // Esquema de respuesta para los usuarios
                  }
                }
              }
            },
            // Otros códigos de respuesta...
          }
        }
      },
      // Otros caminos relacionados con el administrador...
    }
  };
  
  module.exports = adminSwagger;