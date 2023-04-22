const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    key: {
        type: String,
        required: [true, "Open Ai Key is required"],
    }
})

module.exports = mongoose.model("User", User);