const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  dream: {
    type: String,
    required: true,
  },
  dreamTopic: {
    type: String,
    required: true,
  }, 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//MongoDB Collection named here - will give lowercase plural of name 
module.exports = mongoose.model("Card", CardSchema);
