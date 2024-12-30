
const ProdutosModel = require("../Model/ProdutosModel")
const ProdutosImageModel = require("../Model/ProdutosImageModel");
const ProdutosCategorias = require("../Model/ProdutosCategorias");
const CategoriasModel = require("../Model/CategoriasModel");
const ProdutosOpcoesModel = require("../Model/ProdutosOpcoesModel");
const {Sequelize}= require("sequelize")

class ProdutosController{
    async listarId(request, response){
        ProdutosModel.hasMany(ProdutosImageModel, {foreignKey: "product_id"});
        ProdutosModel.belongsToMany(CategoriasModel, {through: ProdutosCategorias,foreignKey: 'product_id',otherKey: 'category_id',});
        ProdutosModel.hasMany(ProdutosOpcoesModel, {foreignKey: "product_id"});
        const id = request.params.id
        const data = await ProdutosModel.findOne({
            where:{
                id: id
            },include: [
                {
                    model: CategoriasModel,
                    through: { attributes: [] },
                },
                {
                    model: ProdutosImageModel,
                },
                {
                    model: ProdutosOpcoesModel,
                },
            ],
        })
        if(!data){
            return response.status(404).json({
                message: "not found"
            })
        }
        return response.status(200).json(data)
    
    }
    async listar(request, response) {
        try {
          let produtos;
          let page;
    
          const limit = parseInt(request.query.limit) || 12;
          if (limit === -1) {
            page = 1;
          } else {
            page = parseInt(request.query.page) || 1;
          }
          ProdutosModel.hasMany(ProdutosImageModel, { foreignKey: "product_id" });
          ProdutosModel.belongsToMany(CategoriasModel, {through: ProdutosCategorias,foreignKey: "product_id", otherKey: "category_id",
          });
          ProdutosModel.hasMany(ProdutosOpcoesModel, { foreignKey: "product_id" });
    
          if (limit === -1) {
            produtos = await ProdutosModel.findAll({
              include: [
                {
                  model: CategoriasModel,
                  through: { attributes: [] },
                  attributes: ["id"], 
                },
                {
                  model: ProdutosImageModel,
                },
                {
                  model: ProdutosOpcoesModel,
                },
              ],
            });
          } else {
            const offset = (page - 1) * limit;
    
            produtos = await ProdutosModel.findAll({
              limit,
              offset,
              include: [
                {
                  model: CategoriasModel,
                  through: { attributes: [] },
                  attributes: ["id"], 
                },
                {
                  model: ProdutosImageModel,
                },
                {
                  model: ProdutosOpcoesModel,
                },
              ],
            });
          } 

          return response.json({
            currentPage: page,
            itemsPerPage: limit === -1 ? "Total" : limit,
            data: produtos,
          });
        } catch (error) {
          console.error(error);
          return response.status(500).json({ error: "Erro ao listar produtos." });
        }
      }
    
    async criar(request, response) {
        ProdutosModel.hasMany(ProdutosImageModel, {foreignKey: "product_id"});
        ProdutosModel.hasMany(ProdutosOpcoesModel, {foreignKey: "product_id"});
        ProdutosModel.belongsToMany(CategoriasModel, {through: ProdutosCategorias,foreignKey: 'product_id',otherKey: 'category_id',});

        
        try {
            const {options, images, ...body } = request.body;      
            
            const product = await ProdutosModel.create(body,{
                include:{
                    through: ProdutosCategorias,
                    model: CategoriasModel
                }
            });
            console.log(body.category_ids)
            
            if (images && images.length > 0) {
                const imageData = images.map((image) => ({
                    type: image.type,
                    path: image.path,
                    product_id: product.id,
                }));

                await ProdutosImageModel.bulkCreate(imageData);

            }
            if (options && options.length > 0) {
                const optionsData = options.map((option) => ({
                   title: option.title,
                    shape: option.shape,
                    radius: option.radius,
                    type: option.type,
                    values: JSON.stringify(option.values),
                    product_id: product.id,
                }));
                
                await ProdutosOpcoesModel.bulkCreate(optionsData);
            }
            product.setCategoriasModels(body.category_ids);
            
            return response.status(201).json({
                message:"Produto adicionado com sucesso"
            });
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                message: "Erro ao cadastrar o produto.",
            });
        }
    }


    async atualizar(request, response){
        const id = request.params.id
        const body = request.body
        const data = await ProdutosModel.findOne({
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
                "message":"Não foi possível atualizar o Produto"
            })
        }
        
        await ProdutosModel.update(body,{
            where:{
                id: id
            }
        })
        return response.status(204).json({
            message: "Produto atualizado com sucesso"
        })
    }

    async excluir(request, response){
        const id = request.params.id
        const data = await ProdutosModel.findOne({
            where:{
                id: id
            }
        })
        if(!data){
            return response.status(404).json({
                message: "Not found"
            })
        }
        await ProdutosModel.destroy({
            where:{
                id: id
            }
        })
        return response.status(204).json({
            message: "Produto deletado com sucesso"
        })
    }
}

module.exports = ProdutosController