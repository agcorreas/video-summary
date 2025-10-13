import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import authRoutes from "./routes/authRoutes.js"
import summRoutes from "./routes/summRoutes.js"
import dotenv from "dotenv"
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err)
  })

app.use("/auth", authRoutes)
app.use("/", summRoutes)

app.listen(5000, () => console.log("Server running on port 5000"))
