const express = require("express");
const router = express.Router();
const adminInfo = require("../DB-models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");
require('dotenv').config();
// Create Admin acount

router.post("/", async (req, res) => {
  //hashing and salt password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const myAdmin = new adminInfo({
    name: req.body.name,
    password: hashedPassword,
    admin: true
  });
  try {
    await myAdmin.save().then(res.status(201).send("SUCCESS"));
  } catch {
    res.status(500).send(err);
  }
});

//Admin Login

router.post("/login", async (req, res) => {
  //checking  if the username exist
  const user = await adminInfo.findOne({ name: req.body.name });
  
  if (!user) return res.status(400).json("Username or Password is wrong");
  //cheching the password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json("Username or Password is wrong");
  //Create a token
  const token = jwt.sign(
    { name: user.name, admin: user.admin },
    process.env.TOKEN_SECRET
  );
  res.header("auth_token", token).json({ token: token });
});
module.exports = router;
