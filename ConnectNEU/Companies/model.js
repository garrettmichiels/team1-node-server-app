import mongoose from "mongoose";
import companySchema from "./schema.js";
const companyModel = mongoose.model("companies", companySchema);
export default companyModel;