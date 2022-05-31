const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        // required: true,
        // minLength: 8,
        default: "12345678",
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
        default: true,
    },
    createdAt: {type:Date, default:Date.now},
    updatedAt: {type:Date, default:Date.now}
})

module.exports = mongoose.model("Admin", AdminSchema);