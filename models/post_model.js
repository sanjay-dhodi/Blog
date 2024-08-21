const mongoose = require("mongoose");
require("../utility/mongoconnection");

const PostSchema = new mongoose.Schema(
  {
    title: {
      require: true,
      type: String,
    },
    desc: {
      require: true,
      type: String,
    },
    image: {
      require: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", PostSchema);
