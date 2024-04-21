import companyModel from "./model.js";

export const findAllCompanies = () => companyModel.find();

export const findCompanyById = async (id) => await companyModel.findOne({_id: id})

export const createCompany = async (company) => await companyModel.create(company)

export const addReview = async (companyId, reviewId) => await companyModel.updateOne({ _id: companyId }, { $push: {reviews: reviewId}})

export const deleteReview = async (companyId, reviewId) => await companyModel.updateOne({ _id: companyId }, { $pop: {reviews: reviewId}})