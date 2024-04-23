import * as dao from "./dao.js";
import * as companyDao from "../Companies/dao.js"
import * as usersDao from "../Users/dao.js"

export default function ReviewRoutes(app) {
    const createReview = async (req, res) => {
        const { userId, companyId } = req.params;
        const review = await dao.addReview(req.body);
        const user = await usersDao.addReview(userId, review._id)
        const company = await companyDao.addReview(companyId, review._id)
        res.json(review);
    }

    const deleteReview = async (req, res) => {
        const {reviewId} = req.params;
        const userSataus = await usersDao.deleteReview(reviewId)
        const companySataus = await companyDao.deleteReview(reviewId)
        const reviewStatus = await dao.deleteReview(reviewId);
        res.json(reviewStatus);
    }

    const updateReview = async (req, res) => {
        const {reviewId} = req.params;
        const reviewStatus = await dao.updateReview(reviewId, req.body);
        res.json(userSataus, companySataus, reviewStatus);
    }

    const findUserReviews = async (req, res) => {
        const { userId } = req.params;
        const user = await usersDao.findUserBy_Id(userId)
        res.json(user.reviews)
    }

    const findCompanyReviews = async (req, res) => {
        const { companyId } = req.params;
        try {
            const company = await companyDao.findCompanyBy_Id(companyId)
            res.json(company.reviews)
        } catch (e) {
            try {
                const company = await companyDao.findCompanyByMuseId(companyId)
                res.json(company.reviews)
            } catch (e) {
                res.json(null)
            }
        }
    }

    const findRecentReviews = async (req, res) => {
        const reviews = await dao.findAllReviews()
        res.json(reviews)
    }

    const findReviewById = async (req, res) => {
        const {reviewId} = req.params
        const review = await dao.findReviewById(reviewId)
        res.json(review)
    }
    
    app.put("/api/reviews/:reviewId", updateReview)
    app.get("/api/reviews/:reviewId", findReviewById)
    app.delete("/api/reviews/:reviewId", deleteReview)
    app.post("/api/reviews/:userId/:companyId", createReview)
    app.get("/api/reviews/userReviews/:userId", findUserReviews)
    app.get("/api/reviews/companyReviews/:companyId", findCompanyReviews)
    app.get("/api/reviews", findRecentReviews)
}