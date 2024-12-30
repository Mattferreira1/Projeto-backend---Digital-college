const express = require("express")
const jwt = require("jsonwebtoken")
const UserController = require("../Controller/UserController")
const ProdutosController = require("../Controller/ProdutosController")
const userController = new UserController()
const produtosController = new ProdutosController()
const CategoriaController = require('../Controller/CategoriaController')
const categoriasController = new CategoriaController()
require("dotenv").config()

const RotasPrivadas = express.Router()

RotasPrivadas.use((request, response, next)=>{ 

    let auth = false   
    if(request.headers ){
        const {authorization} = request.headers
        const token = authorization && authorization.split(' ')[1]
        console.log(token);
        try{
            if(!token){
                return response.status(400).json({
                    message: "Chave jwt ausente"
                })
            }
            
            jwt.verify(token, process.env.KEY_TOKEN)
            auth = true
            if(auth = false){
                return response.status(401).json({
                    message: "token inválido"
                })
            }
            
            next()
        }catch(e){
            return response.status(403).send(e)
        }
    }
})

RotasPrivadas.post("/v1/user", userController.criar)
RotasPrivadas.put("/v1/user/:id", userController.atualizar)
RotasPrivadas.delete("/v1/user/:id", userController.excluir)


RotasPrivadas.post("/v1/product", produtosController.criar)
RotasPrivadas.put("/v1/product/:id", produtosController.atualizar)
RotasPrivadas.delete("/v1/product/:id", produtosController.excluir)

RotasPrivadas.post("/v1/category", categoriasController.criar)
RotasPrivadas.put("/v1/category/:id", categoriasController.atualizar)
RotasPrivadas.delete("/v1/category/:id", categoriasController.excluir)


module.exports = RotasPrivadas