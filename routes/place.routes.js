const expres = require("express");
const router = expres.Router();

// ?? import controller
const placeController = require("../controller/placeController");
// ?? end controller

// !! import middleware object ID
const validObjectId = require("../middlewares/validObjectId");
const validatePlace = require("../validate/placeValidate");
const isAuth = require('../middlewares/isAuth');
const { isAuthorPlace } = require('../middlewares/isAuthor');
// !! end middleware

// !! import config
const upload = require('../config/multer');

router.get("/", placeController.getPlaces);

router.get("/create",  placeController.createPlace);

router.post("/store",  upload.array('image', 5), validatePlace, placeController.storePlace);


router.get("/:id", validObjectId('/places'), placeController.showPlace);

router.get("/edit/:id", isAuthorPlace, isAuth, validObjectId('/places'), placeController.editPlace);

router.put("/update/:id", isAuthorPlace, isAuth, upload.array('image', 5), validObjectId('/places'), validatePlace, placeController.updatePlace);

router.delete("/delete/:id", isAuthorPlace, isAuth, validObjectId('/places'), placeController.destroyPlace);

router.delete("/delete/:id/images", isAuthorPlace, isAuth, validObjectId('/places'), placeController.destroyImage);

module.exports = router;