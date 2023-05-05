const mongoose = require('mongoose')

const Articles = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Creator is required"],
    },
    time: {
        type: Date,
        default: Date.now
    },
    articles: [
        {
            article: {
                type: String,
                required: [true, "Article is required"],
            },
            title: {
                type: String,
                required: [true, "Title is required"],
            }
        }
    ]
})

module.exports = mongoose.model("Articles", Articles);