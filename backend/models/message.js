const mongoose = require('mongoose');


// User Schema Or Document Structure
const message = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
    },
     phone : {
        type : String,
        required : true,
    },
    message : {
        type : String,
        required : true
    }
})


// Create Model
const Message = new mongoose.model("MESSAGE", message);

module.exports = Message;