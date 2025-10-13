import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        return res.status(400).json({ message: "Email, username, and password are required" });
    }
    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }
        const hashedPaswword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, username, passwordHash: hashedPaswword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: { id: newUser._id, email: newUser.email, username: newUser.username } });
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_JWT_KEY, { expiresIn: "1h" });
        res.json({message: "Login successful", token });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});


export default router;