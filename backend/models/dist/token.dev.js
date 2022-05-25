"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  token: {
    type: String,
    required: true
  }
});
var Token = mongoose.model("token", tokenSchema);
module.exports = Token;