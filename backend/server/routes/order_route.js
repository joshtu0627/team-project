const router = require('express').Router();
const {
    wrapAsync,
    authentication
} = require('../../util/util');

const {
    checkout,
    getUserPayments,
    getUserPaymentsGroupByDB,

    // chiu
    getPaidOrders,
} = require('../controllers/order_controller');

const {
    USER_ROLE
} = require('../models/user_model');

router.route('/order/checkout')
    .post(authentication(USER_ROLE.ALL), wrapAsync(checkout));

// load order history by user id
router.route('/order/user/:userId')
    .get(wrapAsync(getPaidOrders));

// For load testing (Not in API Docs)
router.route('/order/payments')
    .get(wrapAsync(getUserPayments));

router.route('/order/payments2')
    .get(wrapAsync(getUserPaymentsGroupByDB));

module.exports = router;