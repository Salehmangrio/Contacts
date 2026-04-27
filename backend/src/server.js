import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import allRoutes from "./app.js"
import connectDB from "./config/db.js";

dotenv.config()

const app = express()

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}))

connectDB()


app.get("/health", (req, res) => {
    res.status(200).json({
        name: "Contact Server",
        status: "OK",
        code: 200
    })
})

app.get("/", (req, res) => {
    res.send("Server is listening ...")
})

app.use("/api", allRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server is listening on PORT ", PORT);
})