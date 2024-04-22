import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    // id: {type: String, unique: true},
    username: {type: String, unique: true, required: true},
    password: {type: String,required: true},
    firstName: String,
    lastName: String,
    email: String,
    dob: Date,
    role: {type: String, default: "MENTEE", enum: ["MENTEE", "MENTOR"]},
    // id: {type: String, unique: true, required:true},
  //  industry: String, //(Only for Mentors)
    major : String,
     companies: [{ref: 'companies',type: mongoose.Schema.Types.ObjectId}],
      following: [{ref: 'users', type: mongoose.Schema.Types.ObjectId}],
      reviews: [{ref: 'reviews', type: mongoose.Schema.Types.ObjectId}]
},
    {collection: 'users'},
);

export default userSchema;