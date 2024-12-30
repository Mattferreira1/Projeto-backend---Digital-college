const express = require("express")

const connection = require("./Config/Connection")

require("./Model/UsuariosModel")
require("./Model/ProdutosModel")
require("./Model/CategoriasModel")
require("./Model/ProdutosCategorias")
require("./Model/ProdutosOpcoesModel")
require("./Model/ProdutosImageModel")

connection.sync({force:true})


const app = express()
app.use(express.json())
const host = "127.0.0.1"
const port = 3000

const RotasPublicas = require("./Routes/RotasPublicas");
const RotasPrivadas = require("./Routes/RotasPrivadas")


app.get("/", (request, response)=>{
    return response.send("bem vindo!!!")
})


app.use(RotasPublicas)
app.use(RotasPrivadas)


app.listen(port, host,()=>{
    console.log(`O server esta rodando na porta http://${host}:${port}`);
})