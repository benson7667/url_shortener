const express = require("express");
const config = require("../config");
const shortUrlModel = require("../models/shortUrlModel");

const shortURLModel = require("../models/shortUrlModel");
const { generateShortId } = require("../utils/generator");
const { isValidURL } = require("../utils/url");

function urlShortener() {
  const router = express.Router();

  router.route("/newurl").post(async (req, res) => {
    const url = req.body?.url;

    // validate URL field must be required
    if (!url)
      res.status(403).end({
        errorCode: "REQUEST/INVALID_PAYLOAD",
        errorMessage: "URL field is required",
      });

    // validate URL must be a valid URL
    if (!isValidURL(url)) {
      res.status(403).send({
        errorCode: "REQUEST/INVALID_PAYLOAD",
        errorMessage: "Invalid URL",
      });
    }

    // insert shortened url record into db
    const newShortenedData = new shortUrlModel({
      original_url: url,
      shortened_url: `${config.shortenedDomain}/${generateShortId(8)}`,
    });

    const result = await newShortenedData.save();

    res.status(200).send({
      url: result.original_url,
      shortenUrl: result.shortened_url,
    });
  });

  router.route("/:shortId").get(async (req, res) => {
    const shortId = req.params?.shortId;

    if (!shortId) {
      res.status(404).send("URL Not Found!");
    }

    // lookup db to find the record
    const result = await shortURLModel.find({
      shortened_url: `${config.shortenedDomain}/${shortId}`,
    });

    // found data, and redirect to their original url
    if (result.length) {
      const [{ original_url }] = result;
      return res.status(301).redirect(original_url);
    }

    return res.status(404).send("404 Not Found");
  });

  return router;
}

module.exports = urlShortener;
