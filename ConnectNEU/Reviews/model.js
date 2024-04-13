import mongoose from "mongoose";
import reviewSchema from "./schema.js";
const reviewModel = mongoose.model("reviews", reviewSchema);
export default reviewModel;