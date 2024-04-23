import companyModel from "./model.js";

export const findAllCompanies = () => companyModel.find();

export const findCompanyBy_Id = async (id) => await companyModel.findById({_id: id})

export const findCompanyByMuseId = async (id) => await companyModel.findOne({companyId: id})

export const createCompany = async (company) => await companyModel.create(company)

export const addReview = async (companyId, reviewId) => await companyModel.updateOne({ _id: companyId }, { $push: {reviews: reviewId}})

export const deleteReview = async (companyId, reviewId) => await companyModel.updateOne({ _id: companyId }, { $pull: {reviews: reviewId}})