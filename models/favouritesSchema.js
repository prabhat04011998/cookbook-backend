const mongoose = require("mongoose");

const FavouriteBody = {
  user_id:{
      type:String,
      required:true
  },
  recipe:{
      type:{},
      required:true
  }
};
const FavouriteSchema = mongoose.Schema(FavouriteBody);

const Favourite = mongoose.model("Favourite", FavouriteSchema);

module.exports = Favourite;
