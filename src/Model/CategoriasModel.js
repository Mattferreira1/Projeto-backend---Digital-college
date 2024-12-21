const { DataTypes, Model } = require('sequelize');
const connection = require("../Config/Connection")

class CategoriasModel extends Model {}

CategoriasModel.init(
  {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    slug:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    use_in_menu:{
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    }
  },
  {
    timestamps: true,
    tableName: "Categorias",
    sequelize: connection, 
  },
);
module.exports = CategoriasModel