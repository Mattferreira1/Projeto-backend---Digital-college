const {Sequelize}= require("sequelize")

const connection = new Sequelize({
    dialect:"mysql",
    database:"Backend",
    host: "127.0.0.1",
    username: "root",
    password: "root",
    port:3306
})
module.exports = connection