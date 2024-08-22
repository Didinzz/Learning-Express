
const passport = require("passport");
const User = require("../model/user");

const wrapAsync = require("../utils/wrapAsync");

exports.register = (req, res) => {
    res.render("auth/register");
}

exports.registerProses = wrapAsync(async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const userRegistered = await User.register(newUser, password);
        req.login(userRegistered, function (error) {
            if (error) return next(error);
            req.flash("success", "welcome to YelpCamp");
            res.redirect("/places");
        })
    } catch (error) {
        console.log(error);
        req.flash("error", "Something went wrong");
        res.redirect("/register");
    }
})

exports.login = (req, res) => {
    res.render("auth/login");
}

exports.loginProses = (req, res) => {
    console.log(req.user);
    req.flash("success", "Login sucessfully");
    res.redirect("/places");
}

exports.logout = (req, res) => {
    req.logout(function (error) {
        if (error) return next(error);
        req.flash("success", "Logout sucessfully");
        res.redirect("/login");
    });
}