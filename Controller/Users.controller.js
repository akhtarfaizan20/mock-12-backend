const { default: mongoose } = require("mongoose");
const { UserModel } = require("../Model/User.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const user = req.body;
  user.timestamp = Date.now();

  try {
    let existingUser = await UserModel.find({ email: user.email });
    console.log(existingUser);
    if (existingUser.length === 0) {
      bcrypt.hash(user.password, 5, async function (err, hash) {
        // Store hash in your password DB.
        if (err) {
          res.status(400).send({ err: "Error is bcrypt" });
        } else {
          user.password = hash;
          const newUser = new UserModel(user);
          await newUser.save();
          res.send({ msg: "Registration successful" });
        }
      });
    } else {
      res.status(400).send({ err: "User is already registered" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await UserModel.find({ email });
    console.log(user);
    if (user.length) {
      bcrypt.compare(password, user[0].password, async function (err, result) {
        // result == true
        if (err) {
          res.status(400).send({ err: "Error is bcrypt" });
        } else {
          const token = jwt.sign({ _id: user[0]._id }, process.env.JWT_SECRET);

          res.send({ token });
        }
      });
    } else {
      res.status(404).send("Email is not Registered");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong");
  }
};

const getProfile = async (req, res) => {
  const { userID } = req.body;
  try {
    let user = await UserModel.findById(userID);
    if (user._id) {
      res.send(user);
    } else {
      res.status(404).send({ msg: "No Data found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong");
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};
