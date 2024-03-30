const { dbConnection } = require('./config');
const { emailConfig } = require('./email');

module.exports = {
  emailConfig,
  dbConnection,
};
