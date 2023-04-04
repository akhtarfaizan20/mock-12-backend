const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../Controller/Users.controller");
const { authentication } = require("../Middleware/Authentication");

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);

userRoutes.post("/login", loginUser);

userRoutes.get("/getProfile", authentication, getProfile);

module.exports = {
  userRoutes,
};
