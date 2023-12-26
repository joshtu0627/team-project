const router = require('express').Router();
const {
    wrapAsync,
    authentication
} = require('../../util/util');

const {
    createReview,
    getReviewsByProductId,
} = require('../controllers/review_controller');

router.route('/review/create')
    .post(wrapAsync(createReview));

router.route('/review/product/:productId')
    .get(wrapAsync(getReviewsByProductId));

module.exports = router;