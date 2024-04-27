import express from "express"

import { getVendas, addVenda, updateVenda, deleteVenda } from "../controllers/venda.js"

const vendasRouter = express.Router()

vendasRouter.get("/v", getVendas)

vendasRouter.post("/v", addVenda)

vendasRouter.put("/v:id", updateVenda)

vendasRouter.delete("/v:id", deleteVenda)

export default vendasRouter