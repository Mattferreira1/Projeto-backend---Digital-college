
const ProfileModel = require("../models/ProfileModel");
const CategoriasModel = require("../Model/CategoriasModel");
const ProdutosImageModel = require("../Model/ProdutosImageModel");

async function execute(){
    let user =  await CategoriasModel.create({
        "name": "Shoes",
        "slug": "shoes",
        "use_in_menu": true
      })

    let profile = await ProdutosImageModel.create(

    )

    
}
execute()