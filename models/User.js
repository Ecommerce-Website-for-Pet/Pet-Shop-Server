const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    fullName: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    address: {
        type: String,
    },
    createdAt: {type:Date, default:Date.now},
    updatedAt: {type:Date, default:Date.now}
})

module.exports = mongoose.model("User", UserSchema);