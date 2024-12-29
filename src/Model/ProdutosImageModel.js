const { DataTypes, Model } = require('sequelize');
const connection = require("../Config/Connection")
const ProdutosModel = require("../Model/ProdutosModel")

class ProdutosImageModel extends Model {}

ProdutosImageModel.init(
  {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    product_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:ProdutosModel,
            key: "id"
        },
        onDelete:"CASCADE"
    },
    enabled:{
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
    },
    path:{
        type: DataTypes.STRING(255),
        allowNull:false
    }
  },
  {
    timestamps: false,
    tableName: "Imagens_de_produtos",
    sequelize: connection, 
  },
);        


module.exports = ProdutosImageModel