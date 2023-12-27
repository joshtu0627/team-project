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
    // const user_id = req.user.id ? req.user.id : null;
    // for test
    const user_id = null;
    let data = [];
    for (let review of reviews) {
        const emojiCount = await Review.countEmojiByReviewId(review.id);
        const userEmoji = await Review.getUserEmojiByReviewId(review.id, user_id);

        const like = emojiCount.find(entry => entry.emoji === 'like')?.emoji_count || 0;
        const excited = emojiCount.find(entry => entry.emoji === 'excited')?.emoji_count || 0;
        const love = emojiCount.find(entry => entry.emoji === 'love')?.emoji_count || 0;
        const dislike = emojiCount.find(entry => entry.emoji === 'dislike')?.emoji_count || 0;
        const angry = emojiCount.find(entry => entry.emoji === 'angry')?.emoji_count || 0;
        const heartbroken = emojiCount.find(entry => entry.emoji === 'heartbroken')?.emoji_count || 0;
        
        const result = {
            ...review,
            like,
            excited,
            love,
            dislike,
            angry,
            heartbroken,
            emoji: userEmoji?.emoji || null,
        };
        data.push(result);
    }
    res.status(200).send({ data });
};

const updateReviewEmoji = async (req, res) => {
    const { review_id, emoji } = req.body;
    const user_id = req.user.id;
    // const user_id = 10051

    const userEmoji = await Review.getUserEmojiByReviewId(review_id, user_id);

    let update
    if (userEmoji === undefined) {
        update = await Review.createReviewEmoji({ review_id, user_id, emoji });
        return res.status(200).send({
            id: update,
            review_id,
            emoji,
        });
    } else {
        update = await Review.updateReviewEmoji(review_id, user_id, emoji);
        return res.status(200).send({ ok: true })
    }
}

const softDeleteReview = async (req, res) => {
    const review_id = req.params.reviewId;
    const result = await Review.softDeleteReview(review_id);
    res.status(200).send({ ok: true });
}

module.exports = {
    createReview,
    getReviewsByProductId,
    updateReviewEmoji,
    softDeleteReview,
};