const express = require("express");
const config = require("../config");
const { generateShortId } = require("../utils/generator");
const { isValidURL } = require("../utils/url");

function urlShortener() {
  const router = express.Router();

  router.route("/newurl").post(async (req, res) => {
    const url = req.body?.url;

    // validate URL field is required
    if (!url)
      res.status(403).end({
        errorCode: "REQUEST/INVALID_PAYLOAD",
        errorMessage: "URL field is required",
      });

    // validate url must be a valid URL
    if (!isValidURL(url)) {
      res.status(403).send({
        errorCode: "REQUEST/INVALID_PAYLOAD",
        errorMessage: "Invalid URL",
      });
    }

    const shortId = generateShortId(8);

    res.status(200).send({
      url,
      shortenUrl: `${config.shortenedDomain}/${shortId}`,
    });
  });

  router.route("/:shortId").get((req, res) => {
    res.status(301).redirect("https://google.com");
  });

  return router;
}

module.exports = urlShortener;
