const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require("../models/user-model");
const posts = require("../models/post-model");
const mongoose = require("mongoose");

const init = (req, res) => {
    res.redirect("/home");
};

const home = async (req, res) => {
    try {
        const postList = await posts
            .find()
            .sort({ createdAt: -1 })
            .populate("user");
        const currentUser = await users.findById(req.session.userId);
        res.render("home", { postList, currentUser });
    } catch (error) {
        console.error("Error loading posts: ", error);
        res.status(500).send("Internal server error");
    }
};

const userProfile = async (req, res) => {
    try {
        const currentUser = await users.findById(req.session.userId);
        res.render("user-profile", { currentUser });
    } catch (err) {
        console.error("Error user profile: ", error);
        res.status(500).send("Internal server error");
    }
};

const loginPage = (req, res) => {
    res.render("login");
};

const signUpPage = (req, res) => {
    res.render("signup");
};

const signUpAuth = async (req, res) => {
    try {
        const { name, password } = req.body;

        const existingUser = await users.findOne({ name: name });

        if (existingUser) {
            return res.status(400).send("User already exists.");
        } else {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const userData = await users.insertMany({
                name,
                password: hashedPassword,
            });

            console.log(userData);
            req.session.userId = userData[0]._id;
            res.redirect("/home");
        }
    } catch (error) {
        console.error("Error registering user: ", error);
        res.status(500).send("Internal server error.");
    }
};

const loginAuth = async (req, res) => {
    try {
        const user = await users.findOne({ name: req.body.name });
        if (!user) {
            return res.status(400).send("User not found.");
        }

        const isPasswordMatch = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (isPasswordMatch) {
            req.session.userId = user._id;
            res.redirect("/home");
        } else {
            return res.status(400).send("Incorrect password.");
        }
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send("Internal server error");
    }
};

const submitPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const user = await users.findById(req.session.userId);

        await posts.insertMany({ title, content, user });
        res.redirect("/");
    } catch (error) {
        console.error("Post cannot be submited", error);
        res.status(500).send("Internal server error");
    }
};

module.exports = {
    init,
    home,
    loginPage,
    loginAuth,
    signUpPage,
    signUpAuth,
    submitPost,
    userProfile,
};
