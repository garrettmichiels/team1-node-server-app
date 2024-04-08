import mongoose from "mongoose";
import userSchema from "./schema.js";
const userModel = mongoose.model("users", userSchema);
export default userModel;