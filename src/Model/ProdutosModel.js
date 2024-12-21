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
    enabled:{
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
    },
    name:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    slug:{
        type: DataTypes.STRING(255),
        allowNull:false
    },
    use_in_menu:{
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    stock:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    description:{
        type: DataTypes.STRING(255),
        
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    price_with_discount:{
        type: DataTypes.FLOAT,
        allowNull: false
    }
  },
  {
    timestamps: true,
    tableName: "Produtos",
    sequelize: connection, 
  },
);
module.exports = UserModel