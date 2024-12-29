const { DataTypes, Model } = require('sequelize');
const connection = require("../Config/Connection")
const ProdutosModel = require("./ProdutosModel")
const CategoriasModel = require("./CategoriasModel")


class ProdutosCategorias extends Model {}

ProdutosCategorias.init(
  {
    product_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:ProdutosModel,
            key: "id"
        },
        onDelete:"CASCADE"
    },
    category_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:CategoriasModel,
            key: "id"
        },
        onDelete:"CASCADE"
    },
  },
  {
    timestamps: false,
    tableName: "Produtos/Categorias",
    sequelize: connection, 
  },
);
module.exports = ProdutosCategorias