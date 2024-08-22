const Place = require("../model/place");
const fs = require("fs");

// !!import utils 
const hereMaps = require("../utils/hereMaps");

// !! import middleware error handler
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");


exports.getPlaces = wrapAsync(async (req, res) => {
    const places = await Place.find();
    res.render("places/index", { places });
})

exports.createPlace = (req, res) => {
    res.render("places/createPlace");
}

exports.storePlace = wrapAsync(async (req, res) => {
    const imagesUplaod = req.files.map(file => ({
        url: file.path,
        filename: file.filename
    }))
    
    const geoData = await hereMaps.geometry(req.body.place.location);

    
    const places = new Place(req.body.place);

    places.author = (req.user._id);
    places.images = imagesUplaod;
    places.geometry = geoData;


    await places.save();


    req.flash("success", "New place created");
    res.redirect("/places");
})

exports.showPlace = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const places = await Place.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    }).populate("author");
    // console.log(places);
    res.render("places/showPlace", { places });
})

exports.editPlace = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const places = await Place.findById(id);
    res.render("places/editPlace", { places });
})

exports.updatePlace = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const places = await Place.findByIdAndUpdate(id, {
        ...req.body.place
    });



    if (req.files && req.files.length > 0) {

        places.images.forEach(image => {
            fs.unlink(image.url, err => new ExpressError(err))
        })

        const imageUpload = req.files.map(file => ({
            url: file.path,
            filename: file.filename
        }))

        places.images = imageUpload;
        await places.save();
    }
    req.flash("success", "Place updated");
    res.redirect(`/places/${places._id}`);
});

exports.destroyPlace = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletePlaces = await Place.findById(id);

    if (deletePlaces.images.length > 0) {
        deletePlaces.images.forEach(image => {
            fs.unlink(image.url, err => new ExpressError(err))
        })
    }
    await deletePlaces.deleteOne();
    req.flash('success', 'Places deleted successfully')
    res.redirect('/places')
})

exports.destroyImage = wrapAsync(async (req, res) => {
    try {
        const { id } = req.params;
        const { images } = req.body;
        console.log(id);
        console.log(images);
        if (!images || images.length === 0) {
            req.flash('error', 'No images selected');
            return res.redirect(`/places/edit/${id}`);
        }
        images.forEach(image => {
            fs.unlink(image, err => new ExpressError(err))
        })

        await Place.findByIdAndUpdate(
            id,
            { $pull: { images: { url: { $in: images } } } }
        );
        req.flash('success', 'Images deleted successfully');
        res.redirect(`/places/${id}`);
    } catch (error) {
        req.flash('error', 'failed to delete images');
        return res.redirect(`/places/edit/${id}`);
    }
})