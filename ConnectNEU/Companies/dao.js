import companyModel from "./model.js";

export const findAllCompanies = () => companyModel.find();

export const findCompanyById = async (id) => {
    const company = await companyModel.findOne({_id: id}).populate("reviews")
}