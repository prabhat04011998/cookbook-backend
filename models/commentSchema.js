const mongoose = require("mongoose");

const CommentBody = {
  user_id:{
      type:String,
      required:true
  },
  user_name:{
      type:String,
      required:false
  },
  recipe_id:{
      type:String,
      required:true
  },
  message:{
      type:String,
      required:true
  }
};
const CommentSchema = mongoose.Schema(CommentBody);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
