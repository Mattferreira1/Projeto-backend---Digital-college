const { DataTypes, Model } = require('sequelize');
const connection = require("../Config/Connection")

class UserModel extends Model {}

UserModel.init(
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
        type: DataTypes.STRING(45),
        allowNull: false
    }
  },
  {
    timestamps: true,
    tableName: "Usuários",
    sequelize: connection, 
  },
);
module.exports = UserModel