var mongoose = require("mongoose");

// creating Schema constructor
var Schema = mongoose.Schema;

// creating new NoteSchema object
var NoteSchema = new Schema({
  title: String,
  body: String
});

// creating model from note schema using mongoose
var Note = mongoose.model("Note", NoteSchema);

// exporting the note model
module.exports = Note;
