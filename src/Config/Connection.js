const {Sequelize}= require("sequelize")

const connection = new Sequelize({
    dialect:"mysql",
    database:"Backend",
    host: "127.0.0.1",
    username: "root",
    password: "root",
    port:3306
})
connection.authenticate()
.then(()=>{
    console.log("conectou com o banco de dados")
})
.catch(erro=>{
    console.log("erro ao se conectar com o banco de dados");
    console.log(erro);

    
})
module.exports = connection
