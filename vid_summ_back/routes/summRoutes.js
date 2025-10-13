import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });


const router = express.Router();

router.post("/summarize", async (req, res) => {
  try{
    const { youtubeLink } = req.body
    if(!youtubeLink.startsWith("https://www.youtube.com/watch?v=")){return res.status(400).json({ message: "Invalid YouTube link" })}
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
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
})

export default router;