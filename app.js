const ejsMate = require("ejs-mate");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const Joi = require("joi");

// !! import middleware error handler
const ErrorHandler = require("./utils/errorHandler");
const wrapAsync = require("./utils/wrapAsync");

// !! models Import
const Place = require("./model/place");

mongoose
  .connect("mongodb://localhost:27017/bestpoints")
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// !! Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
// !! Routes
app.get("/", (req, res) => {
  res.render("home");
});
// app.get("/errorTemplate", (req, res) => {
//   res.render("error");
// });
app.get(
  "/places",
  wrapAsync(async (req, res) => {
    const places = await Place.find();
    res.render("places/index", { places });
  })
);

app.get("/places/create", (req, res) => {
  res.render("places/createPlace");
});

app.post(
  "/places/store",
  wrapAsync(async (req, res, next) => {
    const placeSchema = Joi.object({
      place: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        image: Joi.string().required(),
      }).required(),
    });

    const { error } = placeSchema.validate(req.body);
    if (error) {
      console.log(error);
      return next(new ErrorHandler(error.details[0].message, 400));
    }

    const places = new Place(req.body.place);
    await places.save();
    res.redirect("/places");
    next();
  })
);

app.get(
  "/places/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const places = await Place.findById(id);
    res.render("places/showPlace", { places });
  })
);

app.get(
  "/places/edit/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const places = await Place.findById(id);
    res.render("places/editPlace", { places });
  })
);

app.put(
  "/places/updatePlace/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const places = await Place.findByIdAndUpdate(id, { ...req.body.place });
    res.redirect(`/places/${places._id}`);
  })
);

app.delete(
  "/places/deletePlace/:id",
  wrapAsync(async (req, res) => {
    const deletePlaces = await Place.findByIdAndDelete(req.params.id);
    if (deletePlaces) {
      console.log("deleted");
      res.redirect("/places");
    } else {
      console.log("Something went wrong");
    }
  })
);

app.all("*", (req, res, next) => {
  next(new ErrorHandler("Page Not Found", 404));
});

// !! middleware error
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(statusCode).render("error", { err });
});

app.listen("5000", () =>
  console.log("Listening on port http://localhost:5000")
);
