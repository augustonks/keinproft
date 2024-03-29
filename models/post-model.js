const mongoose = require("mongoose");
const commentSchema = require("../models/comment-schema");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    comments: [commentSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const PostModel = new mongoose.model("posts", postSchema);

module.exports = PostModel;
