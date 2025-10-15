import express from "express";
import dotenv from "dotenv";
import User from "../models/user.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import jwt from "jsonwebtoken";
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

router.post("/addsummary", async (req, res) => {
  try{
    const { response, youtubeLink, token } = req.body;
    //console.log("Headers",req.headers);
    //const token = req.headers.authorization?.split(" ")[1];
    console.log("Token:", token);
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    if(!decoded) { return res.status(401).json({ message: "Unauthorized" }); }
    const userID = decoded.id;
    const result = await model.generateContent([
      
      "Give only the title of this video: ",
      {
        fileData:{
          fileUri:youtubeLink,
        },
      },
    ]);
    const title = result.response.text();
    
    const updateUser = await User.findByIdAndUpdate(userID,{$push: {summaries: {title:title, url: youtubeLink, summaryText: response}}}, {new: true});
    console.log("Updated user:", updateUser);
  }catch(err){
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }

    
});

export default router;