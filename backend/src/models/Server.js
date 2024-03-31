const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { db } = require('../dataBase/db.js'); // Importa la instancia de Sequelize desde db.js
require('dotenv').config();

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 5000;
    this.HOST = process.env.HOST || '0.0.0.0';
    this.path = {
      userRoutes: '/auth',
    };
    this.middewares();
    this.routes();
    this.connectDB();
  }

  middewares() {
    this.app.use(express.static('public'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, '../views'));
  }

  routes() {
    this.app.use(this.path.userRoutes, require('../routes/userRoutes.js'));
  }

  listen() {
    this.app.listen(this.PORT, this.HOST, () => {
      console.log('Servidor conectado al puerto', this.PORT);
    });
  }

  async connectDB() {
    try {
      await db.authenticate();
      console.log('Conexión a la base de datos establecida correctamente');
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
    }
  }
}

module.exports = Server;
