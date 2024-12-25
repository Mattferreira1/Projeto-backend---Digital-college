const express= require("express")
const UserController = require("../Controller/UserController")
const RotasPublicas = express.Router()
require('dotenv').config();
const jwt = require('jsonwebtoken');

RotasPublicas.post("/login", async (request, response)=>{
    const body = request.body
    
    const userController = new UserController()
    const dados = await userController.validar(body.email, body.password)
    if(dados){
        let token = jwt.sign(body, process.env.KEY_TOKEN)
        
        return response.json({
            token: token
        })
    }
    return response.json({
        mensage:"login ou senha incorreto"
    })
})

module.exports = RotasPublicas