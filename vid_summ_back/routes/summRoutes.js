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
      
      "Make a summary of this video tackling the main points: ",
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
    res.json({ message: "Summary added successfully" });
  }catch(err){
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }

    
});

router.get("/getsummaries", async (req, res) => {
  try{
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    if(!decoded) { return res.status(401).json({ message: "Unauthorized" }); }
    const userID = decoded.id;
    const user = await User.findById(userID);
    if(!user) { return res.status(404).json({ message: "User not found" }); }
    res.json({ summaries: user.summaries });
  }catch(err){

    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
})

router.delete("/deletesummary/:id", async (req, res) => {
  try{
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    if(!decoded) { return res.status(401).json({ message: "Unauthorized" }); }
    const userID = decoded.id;
    const summaryIdx = parseInt(req.params.id);
    const user = await User.findById(userID);
    if(!user) { return res.status(404).json({ message: "User not found" }); }
    user.summaries = user.summaries.filter((_,index) => index !== summaryIdx);
    await user.save();
    res.json({ message: "Summary deleted successfully" });
  }catch(err){
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;