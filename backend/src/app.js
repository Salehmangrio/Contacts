import express from "express"
import userRoutes from "./routes/userRoute.js"
import contactRoutes from './routes/contactRoutes.js'

const routes = express.Router()

routes.use("/user", userRoutes)
routes.use("/contacts",contactRoutes)

export default routes