import express from "express"
import cors from "cors"

import userRoutes from "./routes/users.js"
import vendaRoutes from "./routes/vendas.js"

const app = express()

app.use(cors())

app.use(express.json())

app.use("/", userRoutes)
app.use("/", vendaRoutes)

app.listen(8800, () => {
    console.log(`Servidor rodando na porta ${8800}`)
})
