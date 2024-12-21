const express = require("express")
const UserRoutes = express.Router()
const UserController = require("../Controller/UserController")
const userController = new UserController()

UserRoutes.get("/users", userController.listar)

UserRoutes.post("/users", userController.criar)

UserRoutes.put("/users", userController.atualizar)

UserRoutes.delete("/users", userController.excluir)

module.exports = UserRoutes