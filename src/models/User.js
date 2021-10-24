import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 10,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  scores: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Scores",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
