import mongoose from "mongoose";
const scoreSchema = new mongoose.Schema({
  scores: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
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

export default mongoose.model("Scores", scoreSchema);
