var mongoose = require("mongoose");

// creating schema contructor
var Schema = mongoose.Schema;

// creating new UserSchema object
var UserSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  // creating notes array to hold all notes
  notes: [
    {
      // Store ObjectIds in the array which will refer to the note model IDs
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ]
});

// using mongoose's model method to create model
var User = mongoose.model("User", UserSchema);

// export the User model
module.exports = User;
