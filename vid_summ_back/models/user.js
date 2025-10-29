import mongoose from "mongoose"

const SummarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  summaryText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  summaries: [SummarySchema],
})

const User = mongoose.model("User", userSchema)

export default User
