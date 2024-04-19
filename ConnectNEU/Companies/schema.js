import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    id: String,
    companyName: String, 
    companyId: String, 
    reviews: [{ref: "Reviews", type: mongoose.Schema.Types.ObjectId}]
  }, 
  { collection: "companies" }
);

export default companySchema;