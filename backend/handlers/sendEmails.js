const nodemailer = require('nodemailer');
const fs = require('fs');
const util = require('util');
const ejs = require('ejs');
const { emailConfig } = require('../configuracion');
require('dotenv').config();

const transport = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
});

const sendMailToSignUp = async (opciones) => {
  // leer archivo para el email
  const archivo = `${__dirname}/../views/emails/${opciones.archivo}.ejs`;
  // compilarlo
  const compilado = ejs.compile(fs.readFileSync(archivo, 'utf8'));
  // crear el html
  const html = compilado({ url: opciones.url });
  // configurar las opciones del email
  const emailOptions = {
    from: 'NUESTROSITIOWEB <noreply@nuestriositioweb.com>',
    to: opciones.usuario.email,
    subject: opciones.subject,
    html,
  };

  // enviar email

  const sendEmail = util.promisify(transport.sendMail, transport);
  return sendEmail.call(transport, emailOptions);
};

const sendMailToRecoverPassword = async (opciones) => {
  // leer archivo para el email
  const archivo = `${__dirname}/../views/emails/${opciones.archivo}.ejs`;
  // compilarlo
  const compilado = ejs.compile(fs.readFileSync(archivo, 'utf8'));
  // crear el html
  const html = compilado({ opciones });

  const opcionesEmail = {
    from: 'NUESTROSITIOWEB <noreply@nuestriositioweb.com>',
    to: opciones.email,
    subject: opciones.subject,
    html,
  };
  // enviar email
  const sendEmail = util.promisify(transport.sendMail, transport);
  return sendEmail.call(transport, opcionesEmail);
};

module.exports = {
  sendMailToRecoverPassword,
  sendMailToSignUp,
};
