const mongoose = require("mongoose");

const RecipeBody = {
  name: {
    type: String,
    required: true,
  },
  recipe:{
    type: String,
    required: true,
  },
  user_id:{
    type:String,
    required:false
},
  expected_time:{
      type:String,
      required:true
  },
  image_url:{
      type:String,
      required:false
  },
  cuisine_id:{
      type:String,
      required:false
  },
  favCount:{
    type:Number,
    default:0
  }
};
const RecipeSchema = mongoose.Schema(RecipeBody);

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
