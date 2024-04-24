import * as dao from "./dao.js";

export default function CompanyRoutes(app) {
    const createCompany = async (req, res) => { 
        const status = await dao.createCompany(req.body)
        console.log("STATUS CREATE COMPANY", status)
        const company = await dao.findCompanyByMuseId(req.body.museId)
        console.log("CREATED COMPANY", company)
        res.json(company)
    }
    const findCompanyBy_Id = async (req, res) => { 
        const {companyId} = req.params
        const company = await dao.findCompanyBy_Id(companyId)
        res.json(company)
    }
    const findAllCompanies = async (req, res) => { 
        const companies = await dao.findAllCompanies()
        res.json(companies)
    }
    const addCompanyReview = async (req, res) => { 
        const {companyId} = req.params
        const status = await dao.addReview(companyId, req.body)
        const company = await dao.findCompanyBy_Id(companyId)
        res.json(company)
    }
    const deleteCompanyReview = async (req, res) => { 
        const {companyId, reviewId} = req.params
        const status = await dao.deleteReview(companyId, reviewId)
        res.json(status)
    }

    const findCompanyByMuseId = async (req, res) => {
        const {companyId} = req.params
        const company = await dao.findCompanyByMuseId(companyId)
        res.json(company)
    }

    app.put("/api/companies/:companyId", addCompanyReview)
    app.delete("/api/companies/:companyId/:reviewId", deleteCompanyReview)
    app.post("/api/companies", createCompany)
    app.get("/api/companies/muse/:companyId", findCompanyByMuseId)
    app.get("/api/companies/:companyId", findCompanyBy_Id)
    app.get("/api/companies/", findAllCompanies)
}