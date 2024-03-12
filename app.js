const express = require("express");
const session = require("express-session");
require("dotenv").config();
const authRoutes = require("./routes/auth-routes");
const path = require("path");
const bcrypt = require("bcrypt");
const connectToDatabase = require("./database/db");

connectToDatabase();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(authRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
});
