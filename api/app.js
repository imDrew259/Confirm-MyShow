const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const theatreRoutes = require("./routes/theatre");

require("dotenv").config();

const app = express();

const uri = process.env.MongoDB_URI_String;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(authRoutes);
app.use(theatreRoutes);

app.use((err, req, res, next) => {
  if (!err.status) err.status = 500;
  return res
    .status(err.status)
    .json({ errors: err.data, message: err.message });
});

mongoose
  .connect(uri)
  .then((result) => {
    app.listen(8080, () => console.log("Port 8080"));
  })
  .catch((err) => console.log(err));
