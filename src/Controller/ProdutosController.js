
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
    
          let fields = request.query.fields;
          if (typeof fields === "string") {
            fields = fields.split(",").map((field) => field.trim());
          } else if (Array.isArray(fields)) {
            fields = fields.map((field) => field.trim());
          } else {
            fields = [];
          }
    
          const match = request.query.match ? request.query.match.trim() : "";
    
          let whereConditions = {};
    
          if (match) {
            whereConditions[Sequelize.Op.or] = [
              { name: { [Sequelize.Op.like]: `%${match}%` } },
              { description: { [Sequelize.Op.like]: `%${match}%` } },
            ];
          }
    
          if (request.query["price-range"]) {
            const [minPrice, maxPrice] = request.query["price-range"]
              .split("-")
              .map(Number);
            if (minPrice && maxPrice) {
              whereConditions.price = {
                [Sequelize.Op.between]: [minPrice, maxPrice],
              };
            }
          }
    
          if (request.query.option) {
            for (const [key, value] of Object.entries(request.query.option)) {
              whereConditions["$ProdutosOpcoesModels.id$"] = {
                [Sequelize.Op.eq]: key,
              };
              whereConditions["$ProdutosOpcoesModels.values$"] = {
                [Sequelize.Op.in]: value.split(","),
              };
            }
          }
    
          ProdutosModel.hasMany(ProdutosImageModel, { foreignKey: "product_id" });
          ProdutosModel.belongsToMany(CategoriasModel, {
            through: ProdutosCategorias,
            foreignKey: "product_id",
            otherKey: "category_id",
          });
          ProdutosModel.hasMany(ProdutosOpcoesModel, { foreignKey: "product_id" });
    
          if (limit === -1) {
            produtos = await ProdutosModel.findAll({
              include: [
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
              attributes: fields,
              where: whereConditions,
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
                },
                {
                  model: ProdutosImageModel,
                },
                {
                  model: ProdutosOpcoesModel,
                },
              ],
              attributes: fields,
              where: whereConditions,
            });
          }
    
          const totalItems = await ProdutosModel.count({
            where: whereConditions,
          });
    
          const totalPages = limit === -1 ? 1 : Math.ceil(totalItems / limit);
    
          return response.json({
            totalItems,
            totalPages: limit === -1 ? 1 : totalPages,
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

            product.setCategoriasModels(body.category_ids);

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
                console.log(options);
                
                await ProdutosOpcoesModel.bulkCreate(optionsData);
            }

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
                "message":"Não foi possível atualizar o usuário"
            })
        }
        
        await ProdutosModel.update(body,{
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
            message: "Usuário deletado com sucesso"
        })
    }
}

module.exports = ProdutosController