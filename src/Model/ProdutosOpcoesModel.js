const { DataTypes, Model } = require('sequelize');
const connection = require("../Config/Connection")
const ProdutosModel = require("./ProdutosModel");


class ProdutosOpcoesModel extends Model {}

ProdutosOpcoesModel.init(
  {
    id:{
        type: DataTypes.INTEGER,
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
    title:{
      type: DataTypes.STRING(255),
      allowNull: false
    },
    shape:{
        type: DataTypes.ENUM,
        values:["square","circle"],
        defaultValue: "square",
    },
    radius:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    type:{
      type: DataTypes.ENUM,
      values:["text","color"],
      defaultValue: "text"
    },
    values:{
      type: DataTypes.STRING(255),
      allowNull:false
    }
  },
  {
    timestamps: false,
    tableName: "Opções_de_produtos",
    sequelize: connection, 
  },
);
module.exports = ProdutosOpcoesModel