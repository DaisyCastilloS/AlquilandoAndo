const userSwagger = {
    paths: {
      '/auth/signup': {
        post: {
          summary: 'Registrar un nuevo usuario',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    nombre: {
                      type: 'string',
                      example: 'Daisy'
                    },
                    apellido: {
                      type: 'string',
                      example: 'Castillo'
                    },
                    email: {
                      type: 'string',
                      example: 'daisyktbpa111@gmail.com'
                    },
                    password: {
                      type: 'string',
                      example: '123456aaa'
                    },
                    role: {
                      type: 'string',
                      example: 'ADMIN_ROLE'
                    },
                    pais: {
                      type: 'string',
                      example: 'Chile'
                    },
                    ciudad: {
                      type: 'string',
                      example: 'Santiago'
                    },
                    estado: {
                      type: 'string',
                      example: 'Santiago'
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Éxito: usuario registrado con éxito',
              content: {
                'application/json': {
                  schema: {
                    // Esquema de respuesta para el usuario registrado
                  }
                }
              }
            },
            // Otros códigos de respuesta...
          }
        }
      },
      '/auth/confirmar-cuenta/{id}': {
        get: {
          summary: 'Confirmar cuenta de usuario',
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: {
                type: 'string',
                example: 'c53b48f5-6e56-483f-9334-74c949c2a112'
              }
            }
          ],
          responses: {
            // Esquema de respuestas...
          }
        }
      },
      '/auth/signin': {
        post: {
          summary: 'Iniciar sesión de usuario',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string',
                      example: 'daisyktbpa111@gmail.com'
                    },
                    password: {
                      type: 'string',
                      example: '123456aaa'
                    }
                  }
                }
              }
            }
          },
          responses: {
            // Esquema de respuestas...
          }
        }
      },
      '/auth/me': {
        get: {
          summary: 'Obtener perfil de usuario',
          security: [
            {
              BearerAuth: []
            }
          ],
          responses: {
            // Esquema de respuestas...
          }
        },
        put: {
          summary: 'Actualizar perfil de usuario',
          security: [
            {
              BearerAuth: []
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string',
                      example: 'daisyktbpa115@gmail.com'
                    },
                    password: {
                      type: 'string',
                      example: '123456llllll'
                    }
                  }
                }
              }
            }
          },
          responses: {
            // Esquema de respuestas...
          }
        }
      },
      '/auth/me/image': {
        post: {
          summary: 'Subir imagen de perfil de usuario',
          security: [
            {
              BearerAuth: []
            }
          ],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    imagen: {
                      type: 'string',
                      format: 'binary'
                    }
                  }
                }
              }
            }
          },
          responses: {
            // Esquema de respuestas...
          }
        }
      },
      '/auth/forgot-password': {
        post: {
          summary: 'Olvidé mi contraseña',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string',
                      example: 'daisyktbpa115@gmail.com'
                    }
                  }
                }
              }
            }
          },
          responses: {
            // Esquema de respuestas...
          }
        }
      },
      '/auth/forgot-password/{token}': {
        post: {
          summary: 'Restablecer contraseña',
          parameters: [
            {
              in: 'path',
              name: 'token',
              required: true,
              schema: {
                type: 'string',
                example: 'kc83dtebal81711745806653'
              }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    password: {
                      type: 'string',
                      example: 'lilikaka2'
                    },
                    repetirPassword: {
                      type: 'string',
                      example: 'lilikaka2'
                    }
                  }
                }
              }
            }
          },
          responses: {
            // Esquema de respuestas...
          }
        }
      }
    }
  };
  
  module.exports = userSwagger;