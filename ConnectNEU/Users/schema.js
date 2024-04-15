import mongoose from 'mongoose'
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
  //  major : String,
    // experiences: {type: mongoose.Schema.Types.ObjectId,ref: "Experience"},
 //   profileImage: String,
},
    {collection: 'users'},
);

export default userSchema;