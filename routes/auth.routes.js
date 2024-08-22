const expres = require("express");
const router = expres.Router({ mergeParams: true });

const authController = require("../controller/authController");
const passport = require("passport");
// !! middleware
const sudahLogin = require('../middlewares/isAuthenticated');

// !! validation
const loginValidate = require('../validate/loginValidate');
const registerValidate = require('../validate/registerValidate');
// !! end validation

router.route('/register')
    .get(sudahLogin, authController.register)
    .post(registerValidate, authController.registerProses);

router.get('/login', sudahLogin, authController.login);

router.post('/login/proses', loginValidate, passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: {
        type: 'error',
        msg: 'Invalid Username or Password',
    },
}), authController.loginProses);

router.post('/logout', authController.logout);

module.exports = router