require('dotenv').config();
const Review = require('../models/review_model');

const createReview = async (req, res) => {
    const data = req.body;

    if (!data.private || !data.star || !data.height || !data.weight || !data.style || !data.size_review || !data.date || !data.product_id || !data.user_id || !data.size || !data.color_name || !data.color_code) {
        res.status(400).send({ error: 'Create Review Error: Wrong Data Format' });
        return;
    }

    const reviewId = await Review.createReview(data);
    res.status(200).send({
        data: {
            id: reviewId,
            ...data
        }
    });
}

module.exports = {
    createReview,
};