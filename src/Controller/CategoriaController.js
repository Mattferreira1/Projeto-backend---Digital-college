const CategoriasModel = require("../Model/CategoriasModel")
class CategoriaController{
    async listar(request, response){
        const data = await CategoriasModel.findAll()
        return response.status(200).json(data)
    }
    async criar(request, response){
        const body = request.body
        await CategoriasModel.create(body)
        return response.status(201).json({
            "message":"Usuário adicionado com sucesso"
        })
    }

    async atualizar(request, response){
        const id = request.params.id
        const body = request.body
        const data = await CategoriasModel.findOne({
            where:{
                id: id
            }
        })
        if(!data){
            return response.status(404).json({
                message: "Not found"
            })
        }
        else if(!body){
            return response.status(400).json({
                "message":"Não foi possível atualizar o usuário"
            })
        }
        
        await CategoriasModel.update(body,{
            where:{
                id: id
            }
        })
        return response.status(204).json({
            message: "Usuário atualizado com sucesso"
        })
    }

    async excluir(request, response){
        const id = request.params.id
        const user = await CategoriasModel.findOne({
            where:{
                id: id
            }
        })
        if(!user){
            return response.status(404).json({
                message: "Not found"
            })
        }
        await CategoriasModel.destroy({
            where:{
                id: id
            }
        })
        return response.status(204).json({
            message: "Usuário deletado com sucesso"
        })
    }
}

module.exports = CategoriaController