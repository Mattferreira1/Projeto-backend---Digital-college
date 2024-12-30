require('dotenv').config();
const express= require("express")
const UserController = require("../Controller/UserController")
const RotasPublicas = express.Router()
const jwt = require('jsonwebtoken');
const ProdutosController = require("../Controller/ProdutosController");
const produtosController= new ProdutosController()
const userController= new UserController()
const CategoriaController = require('../Controller/CategoriaController')
const categoriasController = new CategoriaController()

RotasPublicas.post("/v1/user/token", async (request, response)=>{
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
RotasPublicas.get("/v1/user", userController.listar)
RotasPublicas.get("/v1/user/:id", userController.listarId)

// RotasPublicas.post("/v1/user", userController.criar)
// RotasPublicas.put("/v1/user/:id", userController.atualizar)
// RotasPublicas.delete("/v1/user/:id", userController.excluir)



RotasPublicas.get("/v1/product/search", produtosController.listar)
RotasPublicas.get("/v1/product/:id", produtosController.listarId)

// RotasPublicas.post("/v1/product", produtosController.criar)
// RotasPublicas.put("/v1/product/:id", produtosController.atualizar)
// RotasPublicas.delete("/v1/product/:id", produtosController.excluir)

RotasPublicas.get("/v1/category/search", categoriasController.listar)
// RotasPublicas.post("/v1/category", categoriasController.criar)
// RotasPublicas.put("/v1/category/:id", categoriasController.atualizar)
// RotasPublicas.delete("/v1/category/:id", categoriasController.excluir)

module.exports = RotasPublicas