const jwt = require('jsonwebtoken');
const { Usuarios } = require('../models');

require('dotenv').config({ path: 'variables.env' });

const generateJWT = (uid = 's') => new Promise((resolve, reject) => {
  const payload = { uid };

  jwt.sign(
    payload,
    process.env.SECRETPRIVATEKEY,
    {
      expiresIn: '4h',
    },
    (err, token) => {
      if (err) {
        reject('No se pudo generar el token');
      } else {
        resolve(token);
      }
    },
  );
});
const validateJWT = async (token = '') => {
  try {
    if (token.length < 10) return null;

    const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
    const usuario = await Usuarios.findByPk(uid);

    if (usuario) {
      if (usuario.estado) return usuario;
      return null;
    } return null;
  } catch (error) {
    return null;
  }
};

const generateId = () => Math.random().toString(32).substring(2) + Date.now().toString();
module.exports = {
  generateJWT,
  validateJWT,
  generateId,
};
