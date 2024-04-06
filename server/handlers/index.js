const { sendMailToRecoverPassword, sendMailToSignUp } = require('./sendEmails');
const { uploadProfileImage } = require('./uploadFile');

module.exports = {
  uploadProfileImage,
  sendMailToSignUp,
  sendMailToRecoverPassword,
};
