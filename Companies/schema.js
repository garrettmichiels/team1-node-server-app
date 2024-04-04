import mongoose from "mongoose";

const companySchema = mongoose.Schema(
  {
    id: String,
    company_name: String, 
    company_id: String, 
    reviews: [{ref: "Reviews", type: mongoose.Schema.Types.ObjectId}]
  }
);

export default companySchema;