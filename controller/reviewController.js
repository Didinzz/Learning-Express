const Place = require("../model/place");
const Review = require("../model/Review");

// !! import middleware error handler
const wrapAsync = require("../utils/wrapAsync");

exports.creteReview = wrapAsync(async (req, res) => {
    const { place_id } = req.params;

    const review = new Review(req.body.review);
    const place = await Place.findById(place_id);
    review.author = req.user._id;
    await place.reviews.push(review);
    await review.save();
    await place.save();
    req.flash("success", "New review created");
    res.redirect(`/places/${place_id}`)
})

exports.deleteReview = wrapAsync(async (req, res) => {
    const { place_id, review_id } = req.params;
    await Place.findByIdAndUpdate(place_id, { $pull: { reviews: review_id } });
    await Review.findByIdAndDelete(review_id);
    req.flash("success", "Review has been deleted");
    res.redirect(`/places/${place_id}`);
})