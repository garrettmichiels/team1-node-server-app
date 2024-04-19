import mongoose from "mongoose";
const reviewSchema = mongoose.Schema(
  {
    id: String,
    stars: Number,
    title: String,
    description: String,
    datePosted: Date,
    company: { ref: "companies", type: mongoose.Schema.Types.ObjectId },
    user:{ ref: "users", type: mongoose.Schema.Types.ObjectId }
  },
  { collection: "reviews" }
);

export default reviewSchema;