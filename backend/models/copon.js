const mongoose = require("mongoose");

const coponSchema = new mongoose.Schema({

  cust_copon: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    required: true,
  },
  code: {
    required: true,
    type: String,
    max: 20,
    min: 5,
  },
  custID:{
    type : mongoose.Schema.Types.ObjectId,
    required :true ,
    ref :"user"

  }
});

module.exports = mongoose.model("copon", coponSchema);
