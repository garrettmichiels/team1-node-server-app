import userModel from "./model.js";

// CRUD
export const findAllUsers = () => userModel.find();
export const findUserById = (id) => userModel.findOne({id}).populate("following").populate("reviews").populate("companies");
export const findUserBy_Id = (id) => userModel.findById({_id: id});
export const findUserByEmail = (email) => userModel.findOne({ email });
export const findUserByUsername = (username) => userModel.findOne({ username });
export const findUserByCredentials = (username, password) =>
  userModel.findOne({ username, password }).populate("following").populate("reviews").populate("companies");
export const createUser = (user) => userModel.create(user);
export const updateUser = (id, user) =>
  userModel.updateOne({ _id: id }, { $set: user });
export const deleteUser = (id) => userModel.deleteOne({ _id: id });
export const addReview = async (userId, reviewId) => await userModel.updateOne({ _id: userId }, { $push: {reviews: reviewId}})
export const deleteReview = async (userId, reviewId) => await userModel.updateOne({ _id: userId }, { $pop: {reviews: reviewId}})
export const deleteFollower = (userId, followerId) => {
  userModel.updateOne({ _id: userId }, { $pull: { followers: followerId } })};
export const addFollower = (userId, followerId) => {
    userModel.updateOne({ _id: userId }, { $push: { followers: followerId } })};
  export const deleteCompany = (userId, companyId) => {
    userModel.updateOne({ _id: userId }, { $pull: { companies: companyId } })};
    