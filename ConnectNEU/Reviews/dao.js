import reviewModel from "./model.js";

export const findAllReviews = () => reviewModel.find().populate("user").populate("company");
export const addReview = (review) => reviewModel.create(review);
export const updateReview = (id, review) => reviewModel.updateOne({ _id: id }, { $set: review });
export const deleteReview = (id) => reviewModel.deleteOne({ _id: id });
export const findReviewById = (id) => reviewModel.findById({_id: id}).populate("user").populate("company")