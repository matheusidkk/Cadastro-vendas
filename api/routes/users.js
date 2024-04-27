import express from "express"

import { getUsers, addUser, updateUser, deleteUser } from "../controllers/user.js"

const usersRouter = express.Router()

usersRouter.get("/u", getUsers)

usersRouter.post("/u", addUser)

usersRouter.put("/u:id", updateUser)

usersRouter.delete("/u:id", deleteUser)

export default usersRouter