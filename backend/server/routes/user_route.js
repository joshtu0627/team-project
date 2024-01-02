const router = require('express').Router();

const { wrapAsync, authentication } = require('../../util/util');

const { signUp, signIn, nativeSignIn, getUserProfile, logout, favorite, deleteFavorite, getFavorite, checkIn, healthCheck, reward} = require('../controllers/user_controller');


router.route('/user/signup').post(wrapAsync(signUp));

router.route('/user/signin').post(wrapAsync(signIn));

router.route('/user/native').post(wrapAsync(nativeSignIn));

router.route('/user/logout').get(wrapAsync(logout)) ;

router.route('/user/healthCheck').get(wrapAsync(healthCheck)) ;

router.route('/user/favorite').post(wrapAsync(favorite)) ;

router.route('/user/deleteFavorite').post(wrapAsync(deleteFavorite)) ;

router.route('/user/getFavorite').get(wrapAsync(getFavorite)) ;

router.route('/user/checkIn').get(wrapAsync(checkIn)) ;

router.route('/user/reward').get(wrapAsync(reward)) ;

router.route('/user/profile').get(authentication(), wrapAsync(getUserProfile));

module.exports = router;
