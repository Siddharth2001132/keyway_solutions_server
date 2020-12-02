const mongoose = require("mongoose");
const { Schema } = mongoose;

const signupSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const signUp = mongoose.model("signUp", signupSchema);

module.exports = signUp;
