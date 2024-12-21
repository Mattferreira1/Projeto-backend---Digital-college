const express = require("express")
const UserRoutes = require("./Routes/UserRoutes")
const app = express()
app.use(express.json())
const host = "127.0.0.1"
const port = 3000

app.get("/", (request, response)=>{
    return response.send("bem vindo!!!")
})
app.use(UserRoutes)

app.listen(port, host,()=>{
    console.log(`O server esta rodando na porta http://${host}:${port}`);
})