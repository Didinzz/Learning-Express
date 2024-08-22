const expres = require("express");
const router = expres.Router({ mergeParams: true });

// !! import middleware object ID
const validObjectId = require("../middlewares/validObjectId");
const isAuth = require("../middlewares/isAuth");
const { isAuhtorReview } = require("../middlewares/isAuthor");
const reviewController = require("../controller/reviewController");
const validateReview = require("../validate/reviewValidate");
// !! end middleware

router.post('/', isAuth, validObjectId('/places'), validateReview, reviewController.creteReview);
router.delete('/:review_id', isAuhtorReview, isAuth, validObjectId('/places'), reviewController.deleteReview);

module.exports = router