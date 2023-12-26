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
};

const getReviewsByProductId = async (req, res) => {
    const product_id = req.params.productId;
    const reviews = await Review.getReviewsByProductId(product_id);
    let data = [];
    for (let review of reviews) {
        const emojiCount = await Review.countEmojiByReviewId(review.id);
        const userEmoji = await Review.getUserEmojiByReviewId(review.id, 1);

        const like = emojiCount.find(entry => entry.emoji === 'like')?.emoji_count || 0;
        const excited = emojiCount.find(entry => entry.emoji === 'excited')?.emoji_count || 0;
        const love = emojiCount.find(entry => entry.emoji === 'love')?.emoji_count || 0;
        const dislike = emojiCount.find(entry => entry.emoji === 'dislike')?.emoji_count || 0;
        const angry = emojiCount.find(entry => entry.emoji === 'angry')?.emoji_count || 0;
        const heartbroken = emojiCount.find(entry => entry.emoji === 'heartbroken')?.emoji_count || 0;
        
        const result = {
            review,
            like,
            excited,
            love,
            dislike,
            angry,
            heartbroken,
            emoji: userEmoji.emoji
        };
        data.push(result);
    }
    res.status(200).send({ data });
};

module.exports = {
    createReview,
    getReviewsByProductId,
};