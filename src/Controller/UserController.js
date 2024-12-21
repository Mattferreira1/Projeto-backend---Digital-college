const UserModel = require("../Model/UsersModel")

class UserController{
    async listar(request, response){
        const data = await UserModel.findAll()
        return response.status(200).json(data)
    }
    async criar(request, response){
        const body = request.body
        await UserModel.create(body)
        return response.status(201).json({
            "message":"Usuário adicionado com sucesso"
        })
    }
    atualizar(request, response){
        
    }
    excluir(request, response){

    }
}

module.exports = UserController