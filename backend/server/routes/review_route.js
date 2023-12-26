const router = require('express').Router();
const {
    wrapAsync,
    authentication
} = require('../../util/util');

const {
    createReview,
    getReviewsByProductId,
    updateReviewEmoji,
} = require('../controllers/review_controller');

router.route('/review/create')
    .post(wrapAsync(createReview));

router.route('/review/product/:productId')
    .get(wrapAsync(getReviewsByProductId));

router.route('/review/emoji')
    .post(wrapAsync(updateReviewEmoji));

module.exports = router;