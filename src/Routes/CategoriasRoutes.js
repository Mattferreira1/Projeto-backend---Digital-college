const express = require("express")
const CategoriaRoutes = express.Router()
const CategoriasController = require("../Controller/CategoriaController")
const categoriasController = new CategoriasController()

CategoriaRoutes.get("/v1/category/search", categoriasController.listar)

// CategoriaRoutes.get("/v1/category:id", categoriasController.listarId)

CategoriaRoutes.post("/v1/category", categoriasController.criar)

CategoriaRoutes.put("/v1/category/:id", categoriasController.atualizar)

CategoriaRoutes.delete("/v1/category/:id", categoriasController.excluir)

module.exports = CategoriaRoutes