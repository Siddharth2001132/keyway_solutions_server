const mongoose = require("mongoose");
const { Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const feedSchema = new Schema({
  _id: {
    type: Number,
    unique: true
  },
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
},{
  _id:false
});

feedSchema.plugin(AutoIncrement, { _id: 'feed_id_counter' });


const feed = mongoose.model("feed", feedSchema);

module.exports = feed;
