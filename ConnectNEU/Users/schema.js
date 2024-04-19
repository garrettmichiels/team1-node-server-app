import mongoose from 'mongoose'
// import companyModel from "../Companies/model"; // Import the companies model
const companySchema = new mongoose.Schema({
  id: String,
  companyName: String,
  companyId: String,
  reviews: String,
});

const reviewSchema = new mongoose.Schema({
  id: String,
  stars: Number,
  title: String,
  description: String,
  datePosted: Date,
  company: { ref: "Companies", type: mongoose.Schema.Types.ObjectId },
  user:{ ref: "Users", type: mongoose.Schema.Types.ObjectId }
},);
// ref "User", type: mongoose.Schema.Types.ObjectId
const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String,required: true},
    firstName: String,
    lastName: String,
    email: String,
    dob: Date,
    role: {type: String, default: "MENTEE", enum: ["MENTEE", "MENTOR"]},
    id: {type: String, unique: true, required:true},
  //  industry: String, //(Only for Mentors)
    major : String,
    //  companies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Companies'},
    // ],
    companies:[
      companySchema
    ],
     following: [reviewSchema],
 //   profileImage: String,
},
    {collection: 'users'},
);

export default userSchema;