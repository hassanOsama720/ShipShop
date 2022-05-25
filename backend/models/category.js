//Manzlawy
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  // _id:mongoose.Types.ObjectId,
  name: {
    type: String,
    required: true,
    max: 20,
    unique: true,
  },
  description: {
    type: String,
    max: 1000,
  },
  bannerImage: String,
});

module.exports = mongoose.model("category", categorySchema);
