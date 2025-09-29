const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const pool = require("./db")
const {YoutubeTranscript} = require("youtube-transcript")
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config()


const app = express()
app.use(express.json())
app.use(cors())


const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

const SECRET_KEY = "your_secret"

app.post("/register", async (req, res) => {
  const { email, username, password } = req.body
  try{
  const hashedPassword = await bcrypt.hash(password, 10)
  const result = await pool.query(
    "INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *",
    [email, username, hashedPassword]
  )
  const user = result.rows[0]
  
  res.json({ message: "User registered successfully", user:user })
  } catch(err){
    console.error(err);
    if(err.code === '23505'){
      res.status(400).json({ message: "Username or email already exists" })
  }
  res.status(500).json({ message: "Internal server error" })
}})

app.post("/login", async (req, res) => {
  const { username, password } = req.body
  try{
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [username])
  const user = result.rows[0]
  if (!user) {
    return res.status(400).json({ message: "Invalid password or user" })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password or user" })
  }
  const token = jwt.sign({ id:user.id, username:user.username}, SECRET_KEY, { expiresIn: "1h" })
  res.json({ token })
} catch(err){
  console.error(err);
  res.status(500).json({ message: "Internal server error" })
}
})

app.post("/summarize", async (req, res) => {
  try{
    const { youtubeLink } = req.body
    const result = await model.generateContent([
      
      "Do a summary of this video tackling the main points: ",
      {
        fileData:{
          fileUri:youtubeLink,
        },
      },
    ]);
    const summary = result.response.text();
    res.json({ reply: summary });
  } catch(err){
    res.status(500).json({ message: "Internal server error" })
  }
})


app.listen(5000, () => console.log("Server running on port 5000"))
