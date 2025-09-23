const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const app = express()
app.use(express.json())
app.use(cors())

const users = [] // This should be a database in a real application
const SECRET_KEY = "your_secret"

app.post("/register", async (req, res) => {
  const { email, username, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  users.push({ email, username, password: hashedPassword })
  res.json({ message: "User registered successfully" })
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body
  const user = users.find((u) => u.username === username)
  if (!user) return res.status(400).json({ message: "User not found" })
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password" })
  }
  console.log("valida")
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" })
  res.json({ token })
})

app.listen(5000, () => console.log("Server running on port 5000"))
