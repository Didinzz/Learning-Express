const Review = require("../model/Review");
const Place = require("../model/place");
module.exports.isAuthorPlace = async (req, res, next) => {
    const { id } = req.params;
    let place = await Place.findById(id);
    if (!place.author.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that");
        return res.redirect(`/places/${place._id}`);
    }
    next();
}

module.exports.isAuhtorReview = async (req, res, next) => {
    const { place_id, review_id } = req.params;
    let review = await Review.findById(review_id);

    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that");
        return res.redirect(`/places/${place_id}`);
    }
    next();


}