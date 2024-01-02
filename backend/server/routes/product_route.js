const router = require('express').Router();
const {wrapAsync} = require('../../util/util');

const {
    getProducts,
    press,
    slopeOne
} = require('../controllers/product_controller');

router.route('/products/press').get(wrapAsync(press)) ; 

router.route('/products/slopeone').get(wrapAsync(slopeOne)) ;

router.route('/products/:category').get(wrapAsync(getProducts));

module.exports = router;
