const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    // _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true,
        trim: true,
        max: 50,
    },

    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    address: {
        country: {
            type: String,
            max: 100
        },
        city: {
            type: String,
            max: 100
        },
        street: {
            type: String,
            max: 100
        },
        building: {
            type: String,
            max: 100
        }
    },
    cart:[{
        product_id:{type:mongoose.Types.ObjectId,required:true,ref:"product"},
        quantity:{type:number}
    }],
    orders: [
        { type: mongoose.Types.ObjectId, ref: "order" }
    ]


})

module.exports = mongoose.model("user", userSchema);