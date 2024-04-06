const { response } = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const { generateId, generateJWT } = require('../helpers');
const { sendMailToSignUp, sendMailToRecoverPassword } = require('../handlers');
const { Usuarios } = require('../models');
require('dotenv').config();

const createUser = async (req, res = response) => {
  const usuario = req.body;
  try {
    const user = await Usuarios.create(usuario);
    // url de confirmacion

    const url = `${req.headers.host}auth/confirmar-cuenta/${user.id}`;

    // enviar email de confirmacion
    await sendMailToSignUp({
      usuario,
      url,
      subject: 'Confirma tu cuenta de NUESTROSITIOWEB',
      archivo: 'account-confirm',
    });

    res.json({
      msg: 'Hemos enviado un correo de confirmacion a su direccion email',
    });
  } catch (error) {
    console.log(error);
  }
};

const accountConfirm = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuarios.findOne({ where: { id } });
    if (!usuario) {
      return res.status(400).json({
        msg: 'La cuenta que intenta confirma no es valida',
      });
    }
    if (usuario.activo) {
      return res.status(400).json({
        msg: 'La cuenta ya se ha confirmado previamente, intenta iniciar sesion :)',
      });
    }
    // confirmar la cuenta
    usuario.token = null;
    usuario.activo = true;
    await usuario.save();
    return res.status(200).json({
      msg: 'La cuenta se ha confirmado, ya puedes iniciar sesion',
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'Error al confirmar la cuenta',
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuarios.findOne({ where: { email } });

  if (!usuario) {
    return res.status(400).json({
      msg: 'Ese usuario no existe',
    });
  }
  if (!usuario.activo) {
    return res.status(400).json({
      msg: 'La cuenta a la que intenta acceder aun no ha sido confirmada',
    });
  }

  if (!usuario.validPassword(password)) {
    // si el password es incorrecto
    return res.status(400).json({
      msg: 'Contraseña incorrecta',
    });
  }

  const token = await generateJWT({
    id: usuario.id,
    createdAt: usuario.createdAt,
    updatedAt: usuario.updatedAt,
  });
  res.json({ token });
};
// USER PROFILE
const getUserProfile = async (req, res) => {
  const usuario = await Usuarios.findOne({
    where: { id: req.usuario.id },
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'token', 'password', 'activo'],
    },
  });

  res.json({
    usuario,
  });
};

const updateProfile = async (req, res) => {
  const { password, role, ...resto } = req.body;
  const { id } = req.usuario;
  const usuario = await Usuarios.findOne({ where: { email: resto.email } });

  if (usuario && req.usuario.email != resto.email) {
    return res.status(400).json({
      msg: `Ya existe un usuario con el email ${resto.email}`,
    });
  }
  if (password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }
  try {
    await Usuarios.update(resto, { where: { id } });

    res.json({
      msg: 'Datos actualizados con exito',
    });
  } catch (error) {
    res.status(400).json({
      msg: 'Error al tratar de actualizar',
    });
  }
};

const imageProfile = async (req, res) => {
  try {
    const { id } = req.usuario;
    const usuario = await Usuarios.findByPk(id);

    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ningún archivo' });
    }
    if (req.file) {
      if (usuario.imagen) {
        const filename = path.basename(usuario.imagen);
        const imagePath = path.join(
          __dirname,
          '..',
          'public',
          'uploads',
          'users',
          filename,
        );
        fs.unlink(imagePath, (err) => {
          if (err) {
          }
        });
      }
      usuario.imagen = req.file.filename;
      await usuario.save();
    }

    res.json({ msg: 'Imagen de perfil actualizada' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
// RECOVER USER CONTROLLER

const forgotPassword = async (req, res = response) => {
  try {
    const { email } = req.body;
    const usuario = await Usuarios.findOne({ where: { email } });

    usuario.token = generateId();

    const url = `${req.headers.referer}restore/${usuario.token}`;
    await usuario.save();

    // enviar email
    sendMailToRecoverPassword({
      email,
      nombre: usuario.nombre,
      token: usuario.token,
      subject: 'Reestablece tu contraseña en NUESTRA PAGINA WEB',
      url,
      archivo: 'recover-password',
    });
    return res.status(200).json({
      msg: 'Se ha enviado un correo para que reestablezca su contraseña',
    });
  } catch (error) {
    console.log(error);
  }
};

const newPassword = async (req, res = response) => {
  // validando password
  try {
    const { token } = req.params;
    const { password, repetirPassword } = req.body;
    if (password !== repetirPassword) {
      return res.status(400).json({
        error: 'Las contraseñas no son iguales',
      });
    }
    const usuario = await Usuarios.findOne({ where: { token } });
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);
    usuario.token = null;
    await usuario.save();

    return res.status(200).json({
      msg: 'La contraseña se ha reestablecido correctamente',
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'Error al reestablecer la contraseña',
    });
  }
};
// ADMIN CONTROLLERSSS

const getAllUsers = async (req, res) => {
  try {
    const usuarios = await Usuarios.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'token', 'password', 'activo'],
      },
    });
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener usuarios' });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuarios.findOne({
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'token', 'password', 'activo'],
      },
    });
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ msg: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener usuario' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { _id, password, ...resto } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }
  try {
    await Usuarios.update(resto, { where: { id } });

    res.json({
      msg: 'Datos actualizados con exito',
    });
  } catch (error) {
    res.status(400).json({
      msg: 'Error al tratar de actualizar',
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const usuario = await Usuarios.findByPk(req.params.id);

    const { id, nombre, apellido } = usuario;
    await usuario.destroy();
    res.json({
      msg: `El usuario ${nombre} ${apellido} con el id: ${id} ha sido eliminado con exito`,
    });
  } catch (error) {
    res.status(400).json({
      msg: `Se produjo un error al intentar eliminar ha ${nombre} ${apellido}`,
    });
  }
};

module.exports = {
  createUser,
  accountConfirm,
  login,
  getUserProfile,
  updateProfile,
  imageProfile,
  forgotPassword,
  newPassword,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
