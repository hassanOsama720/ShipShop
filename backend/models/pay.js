const mongoose = require("mongoose");


const paySchema = new mongoose.Schema({


    _id: mongoose.Types.ObjectId,
    items: {
        type:Array,
        unique: false,
        required: false
    },




})

module.exports = mongoose.model("pay", paySchema)