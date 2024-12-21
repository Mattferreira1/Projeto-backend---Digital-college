const connection = require("../Config/Connection")

require("../Model/UsersModel")
require("../Model/ProdutosModel")
require("../Model/CategoriasModel")
require("../Model/ProdutosCategorias")
require("../Model/ProdutosOpcoesModel")
require("../Model/ProdutosImageModel")

connection.sync({force:true})