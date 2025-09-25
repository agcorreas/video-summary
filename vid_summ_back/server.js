const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const pool = require("./db")
const {OpenAI} = require("openai");
const {YoutubeTranscript} = require("youtube-transcript")
require("dotenv").config()


const app = express()
app.use(express.json())
app.use(cors())

client = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: process.env.GITHUB_TOKEN,
});

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
    const videoId = extractVideoID(youtubeLink)
    const transcript = await YoutubeTranscript.fetchTranscript(videoId)
    const text = transcript.map(item => item.text).join(" ")
    console.log(text)
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: `Generate a concise summary for this video transcript: ${text}. The summary should capture the main points discussed in the video.` }],
    });
    const summary = response.choices[0].message.content;
    res.json({ reply: summary });
  } catch(err){
    console.log("hubo error")
    console.error(err);
    res.status(500).json({ message: "Internal server error" })
  }
})

function extractVideoID(url) {
  const match = url.match(/v=([^&]+)/)
  if (match && match[1]) { return match[1] }
  throw new Error("Invalid YouTube URL")
}
app.listen(5000, () => console.log("Server running on port 5000"))
