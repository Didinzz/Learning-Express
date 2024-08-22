const loginSchema = require("../schemas/login");
const ExpressError = require("../utils/ExpressError");

module.exports = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        const massage = error.details.map((el) => el.message).join(",");
        return next(new ExpressError(massage, 400));
    } else {
        next();
    }
};