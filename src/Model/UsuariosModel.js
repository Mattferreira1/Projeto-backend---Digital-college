const { DataTypes, Model } = require('sequelize');
const connection = require("../Config/Connection")

class UsuariosModel extends Model {}

UsuariosModel.init(
  {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    firstname:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    surname:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    password:{
        type: DataTypes.STRING(255),
        allowNull: false
    }
  },
  {
    timestamps: true,
    tableName: "Usuarios",
    sequelize: connection, 
  },
);
module.exports = UsuariosModel