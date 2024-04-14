const Sequelize = require('sequelize');
const { db } = require('../dataBase');

const Inmueble = db.define('Inmueble', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El nombre es requerido',
      },
      notEmpty: {
        msg: 'Debe ingresar un nombre',
      },
    },
  },
  link: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: {
        msg: 'Debe ser una URL válida',
      },
    },
  },
  currency: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [['USD', 'EUR', 'ARS']], // Definir las monedas permitidas
        msg: 'Moneda no válida',
      },
    },
  },
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [5, 100],
        msg: 'El título debe tener entre 5 y 100 caracteres',
      },
    },
  },
  precio: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      isDecimal: {
        msg: 'Debe ser un número decimal',
      },
      min: {
        args: [0],
        msg: 'El precio no puede ser negativo',
      },
    },
  },
  dormitorios: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: 'Debe ser un número entero',
      },
      min: {
        args: [0],
        msg: 'Número de dormitorios no válido',
      },
    },
  },
  baños: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: 'Debe ser un número entero',
      },
      min: {
        args: [0],
        msg: 'Número de baños no válido',
      },
    },
  },
  ambientes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: 'Debe ser un número entero',
      },
      min: {
        args: [0],
        msg: 'Número de ambientes no válido',
      },
    },
  },
  superficie_total: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: 'Debe ser un número entero',
      },
      min: {
        args: [0],
        msg: 'Superficie total no válida',
      },
    },
  },
  ubicacion: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [5, 255],
        msg: 'La ubicación debe tener entre 5 y 255 caracteres',
      },
    },
  },
});

module.exports = Inmueble;
