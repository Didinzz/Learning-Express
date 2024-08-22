const ejsMate = require("ejs-mate");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./model/user");


// !! import session flash
const session = require("express-session");
const flash = require("connect-flash");

// !! import middleware error handler
const ExpressError = require("./utils/ExpressError");

// !! set up view engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// !!  set upMiddleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: "kucing-Garong",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))
app.use(flash());

// !! passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // proses passport menyimpan hasil authentikasi diatas didalam passport session yang nanti mengecek middleware user sudah login atau belum
passport.deserializeUser(User.deserializeUser()); // proses passport mengambil data dari yang sudah disimpan oleh serializeUser yang disimpan didalam session 

// !! set global session
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})
// !! end setup global session

// !! Routes
app.get("/", (req, res) => {
    res.render("home");
});

// !! route import
const placeRoutes = require("./routes/place.routes");
const reviewRoutes = require("./routes/review.routes");
const authRoutes = require("./routes/auth.routes");

app.use("/places", placeRoutes);
app.use('/places/:place_id/reviews', reviewRoutes);
app.use(authRoutes);

app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

// !! middleware error
app.use((err, req, res, next) => {
    const {
        statusCode = 500
    } = err;
    if (!err.message)
        err.message = "Something went wrong";
    res.status(statusCode).render("error", { err });
}
);

// !! connect mongoose
mongoose.connect("mongodb://localhost:27017/bestpoints").then((result) => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

app.listen("5000", () => console.log("Listening on port http://localhost:5000"),);
