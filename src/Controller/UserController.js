const UserModel = require("../Model/UsuariosModel")
const bcrypt = require('bcrypt');

class UserController{

    async validar(email, password){
        const usuario = await UserModel.findOne({ where: {email}  });

        if (!usuario) {
            console.log('Usuário não encontrado.');
            return { sucesso: false, mensagem: 'E-mail ou senha inválidos.' };
        }

        // Comparar a senha fornecida com o hash armazenado
        const senhaCorreta = await bcrypt.compare(password, usuario.password);

        if (senhaCorreta) {
            return true;
        } else {
            return false;
        }
    }

    async listar(request, response){
        const data = await UserModel.findAll()
        return response.status(200).json(data)
    }

    async listarId(request, response){
        const id = request.params.id
        const data = await UserModel.findOne({
            where:{
                id: id
            }
        })
        if(!data){
            return response.status(404).json({
                message: "not found"
            })
        }
        return response.status(200).json(data)
    
    }

    async criar(request, response){
        const body = request.body

        if(!body.firstname || !body.surname || !body.email || !body.password){
            return response.status(400).json({
                "message":"Não foi possível cadastrar o usuário"
            })
        }

        else if(body.password == body.confirmPassword){
            const saltRounds = 1; 
            const hash = await bcrypt.hash(body.password, saltRounds);
    
            await UserModel.create({
                "firstname": body.firstname,
                "surname": body.surname,
                "email": body.email,
                "password": hash
            
            })
            return response.status(201).json({
                "firstname": body.firstname,
                "surname": body.surname,
                "email": body.email,
                "password": hash
            
            })
        }else{
            return response.status(400).json({
                message: "As senhas estão diferentes"
            })
        }
    }

    async atualizar(request, response){
        const id = request.params.id
        const body = request.body
        const data = await UserModel.findOne({
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
        
        await UserModel.update(body,{
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
        const user = await UserModel.findOne({
            where:{
                id: id
            }
        })
        if(!user){
            return response.status(404).json({
                message: "Not found"
            })
        }
        await UserModel.destroy({
            where:{
                id: id
            }
        })
        return response.status(204).json({
            message: "Usuário deletado com sucesso"
        })
    }
}

module.exports = UserController