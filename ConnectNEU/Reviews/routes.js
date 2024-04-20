import * as dao from "./dao.js";
import * as companyDao from "../Companies/dao.js"
import * as usersDao from "../Users/dao.js"

export default function ReviewRoutes(app) {
    const createReview = async (req, res) => {
        const { userId, companyId } = req.params;
        const review = await dao.addReview(req.body);
        const user = await usersDao.addReview(userId, req.body.id)
        const company = await companyDao.addReview(companyId, req.body.id)
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
        const user = await usersDao.findById(userId)
        res.json(user.reviews)
    }

    const findCompanyReviews = async (req, res) => {
        const { companyId } = req.params;
        const company = await companyDao.findById(companyId)
        res.json(company.reviews)
    }

    const findRecentReviews = async (req, res) => {
        const reviews = await dao.findAllReviews()
        res.json(reviews)
    }
    
    app.put("/api/reviews/:reviewId", updateReview)
    app.delete("/api/reviews/:reviewId", deleteReview)
    app.post("/api/reviews/:userId/:companyId", createReview)
    app.get("/api/reviews/userReviews/:userId", findUserReviews)
    app.get("/api/reviews/companyReviews/:companyId", findCompanyReviews)
    app.get("/api/reviews", findRecentReviews)
}