const express = require("express")
const jwt = require("jsonwebtoken")
const UserController = require("../Controller/UserController")
const userController = new UserController()
require("dotenv").config()

const RotasPrivadas = express.Router()

RotasPrivadas.use((request, response, next)=>{ 

    let auth = false   
    if(request.headers ){
        const {authorization} = request.headers
        try{
            jwt.verify(authorization, process.env.KEY_TOKEN)
            auth = true
            
            next()
        }catch(e){
            return response.status(403).send(e)
        }
    }
})

RotasPrivadas.get("/v1/user", userController.listar)




module.exports = RotasPrivadas