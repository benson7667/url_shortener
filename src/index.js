require("dotenv").config();

const express = require("express");
const urlShortener = require("./routes/urlShortener")();
const config = require("./config");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ health: "OK!" });
});

app.use("/", urlShortener);

app.listen(config.port, () => {
  console.log(`Sever running on port ${config.port}`);
});
