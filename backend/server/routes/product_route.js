const router = require('express').Router();
const { wrapAsync } = require('../../util/util');

const { getProducts, getProductById } = require('../controllers/product_controller');

router.route('/products/:category(men|women|all|accessories|search|hot|details)').get(wrapAsync(getProducts));

router.route('/products/:id').get(wrapAsync(getProductById));

module.exports = router;
