const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");

router.post("/register", async function (req, res) {
  try {
    const { name, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(404).send(error);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newItem = new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await newItem.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(404).send(error);
  }
   });

  router.post("/login", async function (req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).send(error);
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(404).send(error);
      }
      const { _id, name } = user.toObject();;
      res.send({ _id, name, email });
    } catch (error) {
      res.status(404).send(error);
    }
  });

  router.post('/changepassword', async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send(error);
      }
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(404).send(error);
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

     return res.status(200).send("Password changed successfully."); 
    } catch (error) {
      res.status(404).send(error);
    }
  });
  module.exports = router