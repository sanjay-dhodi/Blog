require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(console.log("connection successfull"))
  .catch((err) => console.log(err));
