const mongoose = require("mongoose");
const { Schema } = mongoose;

const SHORT_URL_MODEL = "shortUrlModel";
const SHORT_URL_COLLECTION = "url_shortener";

const shortUrlModel = new Schema(
  {
    original_url: { type: String, required: true },
    shortened_url: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  SHORT_URL_MODEL,
  shortUrlModel,
  SHORT_URL_COLLECTION
);
