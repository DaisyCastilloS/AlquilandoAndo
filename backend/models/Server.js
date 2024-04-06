const express = require("express")
const { dbConnection } = require("../configuracion/index.js")
const path = require("path")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require('dotenv').config()
const swaggerUi = require('swagger-ui-express');

// Import Swagger files
const userSwagger = require('../swagger/userSwagger');
const adminSwagger = require('../swagger/adminSwagger');

class Server{
    constructor(){
        this.app = express()
        this.PORT = process.env.PORT || 5000
        this.HOST = process.env.HOST || '0.0.0.0'
        this.path = {
            userRoutes:'/auth'
        }
        this.middewares()
        this.routes()
        this.connectDB()
        this.setupSwagger()
    }
    middewares(){
        this.app.use(express.static("public"))
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended:true}))
        this.app.use(cookieParser())
        this.app.use(cors())
        this.app.set("view engine",'ejs')
        this.app.set("views",path.join(__dirname,'../views'))
    }

    routes(){
        this.app.use(this.path.userRoutes, require('../routes/userRoutes.js'))
    }

    listen(){
        this.app.listen(this.PORT,this.HOST, ()=>{
            console.log("Servidor conectado al puerto", this.PORT)
        })
    }
    async connectDB(){
        await dbConnection()
    }

    setupSwagger() {
        // Swagger specifications
        const swaggerDocument = {
            openapi: '3.0.0',
            info: {
                title: 'API Documentation',
                version: '1.0.0',
                description: 'API documentation',
            },
            paths: {
                ...userSwagger.paths,
                ...adminSwagger.paths
            }
        };

        // Swagger UI middleware
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
}

module.exports =  Server
