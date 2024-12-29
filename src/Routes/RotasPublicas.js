const express= require("express")
const UserController = require("../Controller/UserController")
const RotasPublicas = express.Router()
require('dotenv').config();
const jwt = require('jsonwebtoken');
const ProdutosController = require("../Controller/ProdutosController");
const produtosController= new ProdutosController()

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
RotasPublicas.get("/Produto", produtosController.listar)
RotasPublicas.get("/Produto/:id", produtosController.listarId)
RotasPublicas.post("/Produto", produtosController.criar)
RotasPublicas.put("/Produto/:id", produtosController.atualizar)
RotasPublicas.delete("/Produto/:id", produtosController.excluir)

module.exports = RotasPublicas