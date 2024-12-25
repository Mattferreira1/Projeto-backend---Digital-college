const express = require("express")
const UserRoutes = express.Router()
const UserController = require("../Controller/UserController")
const userController = new UserController()

UserRoutes.get("/v1/user", userController.listar)

UserRoutes.get("/v1/user/:id", userController.listarId)

UserRoutes.post("/v1/user", userController.criar)

UserRoutes.put("/v1/user/:id", userController.atualizar)

UserRoutes.delete("/v1/user/:id", userController.excluir)

module.exports = UserRoutes