const express = require("express")

const path = require("path")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require('dotenv').config()
const swaggerUi = require('swagger-ui-express');

// Import Swagger files
const { swaggerDocument, dbConnection } = require("../config")

class Server {
  constructor() {
    this.app = express()
    this.PORT = process.env.PORT || 5000
    this.HOST = process.env.HOST || '0.0.0.0'
    this.path = {
      userRoutes: '/auth',
      inmmueblesRoutes: '/property'
    }
    this.middewares()
    this.routes()
    this.connectDB()

  }
  middewares() {
    this.app.use(express.static("public"))
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(cookieParser())
    this.app.use(cors())
    this.app.set("view engine", 'ejs')
    this.app.set("views", path.join(__dirname, '../views'))
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  }

  routes() {
    this.app.use(this.path.userRoutes, require('../routes/userRoutes.js'))
    this.app.use(this.path.inmmueblesRoutes, require('../routes/inmueblesRoutes.js'))
  }

  listen() {
    this.app.listen(this.PORT, this.HOST, () => {
      console.log("Servidor conectado al puerto", this.PORT)
    })
  }
  async connectDB() {
    await dbConnection()
  }


}

module.exports = Server