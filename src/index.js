require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const urlShortener = require("./routes/urlShortener")();
const config = require("./config");

const app = express();

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongodb ...");
  })
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ health: "OK!" });
});

app.use("/", urlShortener);

app.listen(config.port, () => {
  console.log(`Sever running on port ${config.port}`);
});
