const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    fullName: {
        type: String,
    },
    phonenumber: {
        type: String,
    },
    address: {
        type: String,
    },
    admin:{
        type: Boolean,
        default: false,
    },
    createdAt: {type:Date, default:Date.now},
    updatedAt: {type:Date, default:Date.now}
})

module.exports = mongoose.model("User", UserSchema);