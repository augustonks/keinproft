const express = require("express");
const routes = express.Router();
const TaskController = require("../controller/TaskController");

routes.get("/", TaskController.init);

routes.get("/home", TaskController.home);
routes.get("/user/:userid", TaskController.userProfile);

routes.get("/login", TaskController.loginPage);

routes.get("/signup", TaskController.signUpPage);

routes.post("/signup", TaskController.signUpAuth);

routes.post("/login", TaskController.loginAuth);

routes.post("/submit-post", TaskController.submitPost);

module.exports = routes;
