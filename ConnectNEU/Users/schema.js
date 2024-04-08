import mongoose from 'mongoose'
// ref "User", type: mongoose.Schema.Types.ObjectId
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    name: String,
    role: String,
    industry: String, //(Only for Mentors)
    major : String,
    // experiences: {type: mongoose.Schema.Types.ObjectId,ref: "Experience"},
    profileImage: String,
},
    {collection: 'users'},
);

export default userSchema;