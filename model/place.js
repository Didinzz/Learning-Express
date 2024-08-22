const mongoose = require("mongoose");
const Review = require("./Review");
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  location: String,
  geometry:{
    type: {
      type: String,
      required: true,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  images: [
    {
      url: String,
      filename: String
    }
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review"
  }],
});

placeSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({ _id: { $in: doc.reviews } })
  } 11
})

module.exports = mongoose.model("Place", placeSchema);
