import userModel from "./model.js";

// CRUD
export const findAllUsers = () => userModel.find();
export const findUserById = (id) => userModel.findOne({id}).populate("following").populate("reviews").populate("companies");
export const findUserBy_Id = (id) => userModel.findById({_id: id}).populate("following").populate("reviews").populate("companies");;
export const findUserByEmail = (email) => userModel.findOne({ email }).populate("following").populate("reviews").populate("companies");;
export const findUserByUsername = (username) => userModel.findOne({ username }).populate("following").populate("reviews").populate("companies");;
export const findUserByCredentials = (username, password) =>
  userModel.findOne({ username, password }).populate("following").populate("reviews").populate("companies");
export const createUser = (user) => userModel.create(user);
export const updateUser = (id, user) =>
  userModel.updateOne({ _id: id }, { $set: user });
export const deleteUser = (id) => userModel.deleteOne({ _id: id });
export const addReview = async (userId, reviewId) => await userModel.updateOne({ _id: userId }, { $push: {reviews: reviewId}})
export const deleteReview = async (userId, reviewId) => await userModel.updateOne({ _id: userId }, { $pull: {reviews: reviewId}})

export const deleteCompany = (userId, companyId) => {
    userModel.updateOne({ _id: userId }, { $pull: { companies: companyId } })};
export const addCompany = async (userId, companyId) => await userModel.updateOne({ _id: userId }, { $push: {companies: companyId}})
export const addJobToUser = (userId, job) => {
  userModel.updateOne({ _id: userId }, { $push: { job: job } })}

    