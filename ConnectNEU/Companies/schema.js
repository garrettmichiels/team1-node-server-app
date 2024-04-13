import mongoose from "mongoose";

const companySchema = mongoose.Schema(
  {
    id: String,
    companyName: String, 
    companyId: String, 
    reviews: [{ref: "Reviews", type: mongoose.Schema.Types.ObjectId}]
  }, 
  { collection: "companies" }
);

export default companySchema;