import mongoose from "mongoose";
const reviewSchema = mongoose.Schema(
  {
    id: String,
    stars: Number,
    title: String,
    description: String,
    datePosted: Date,
    company: { ref: "Companies", type: mongoose.Schema.Types.ObjectId },
    user:{ ref: "Users", type: mongoose.Schema.Types.ObjectId }
  },
  { collection: "reviews" }
);

export default reviewSchema;