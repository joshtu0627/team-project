const router = require('express').Router();
const {
    wrapAsync,
    authentication
} = require('../../util/util');

const {
    createReview
} = require('../controllers/review_controller');

router.route('/review/create')
    .post(wrapAsync(createReview));

module.exports = router;