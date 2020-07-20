const mongoose = require("mongoose");

const NoteBody = {
  note: {
    type: String,
    required: true,
  },
  user_id:{
      type:String,
      required:false
  },
  recipe_id:{
    type: String,
    required: true,
  }
};
const NoteSchema = mongoose.Schema(NoteBody);

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
