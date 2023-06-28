const express = require("express");
const jwt = require("jsonwebtoken");
const { userValidator } = require("../middleware/userValidator");
const { UserModel } = require("../model/userModel");
const userRouter = express.Router();

userRouter.post("/register", userValidator, async (req, res) => {
  try {
    let user = await new UserModel(req.body);
    user.save();
    res.send({
      message: "User register successfully",
    });
  } catch (error) {
    res.send(error);
  }
});

userRouter.post("/login",  async (req, res) => {
    let token = jwt.sign(req.body, "dharmik");
    try {
      let data = await UserModel.find(req.body);
      res.send({
        message: "Login Successfull",
        username: data[0].username,
        role: req.body.email== "admin@gmail.com" ? "admin" : "user",
        token: token,
      });
    } catch (error) {
      res.send({
        message: error.message,
        adminsay: "your username or password are wrong",
      });
    }
  });

  module.exports = { userRouter };