const mongoose = require("mongoose");

const userSchema = new mongoose.mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const UserModel = new mongoose.model("users", userSchema);

module.exports = UserModel;
