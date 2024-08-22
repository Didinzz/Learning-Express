module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        req.flash('error', 'You have been logged in please logout frist');
        res.redirect('/places');
    }
    next();
}