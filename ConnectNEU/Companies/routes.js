import * as dao from "./dao.js";

export default function CompanyRoutes(app) {
    const createCompany = async (req, res) => { 
        const company = await dao.createCompany(req.body)
        res.json(company)
    }
    const findCompanyById = async (req, res) => { 
        const {companyId} = req.params
        const company = await dao.findCompanyById(companyId)
        res.json(company)
    }
    const findAllCompanies = async (req, res) => { 
        const companies = await dao.findAllCompanies()
        res.json(companies)
    }
    const addCompanyReview = async (req, res) => { 
        const {companyId} = req.params
        const status = await dao.addReview(companyId, req.body)
        const company = await dao.findCompanyById(companyId)
        res.json(company)
    }
    const deleteCompanyReview = async (req, res) => { 
        const {companyId, reviewId} = req.params
        const status = await dao.deleteReview(companyId, reviewId)
        res.json(status)
    }

    app.put("/api/companies/:companyId", addCompanyReview)
    app.delete("/api/companies/:companyId/:reviewId", deleteCompanyReview)
    app.post("/api/companies/", createCompany)
    app.get("/api/companies/:companyId", findCompanyById)
    app.get("/api/companies", findAllCompanies)
}