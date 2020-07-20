const mongoose = require("mongoose");

const CuisineBody = {
  name: {
    type: String,
    required: true,
  },
  image_url:{
      type:String,
      required:false
  }
};
const CuisineSchema = mongoose.Schema(CuisineBody);

const Cuisine = mongoose.model("Cuisine", CuisineSchema);

module.exports = Cuisine;
