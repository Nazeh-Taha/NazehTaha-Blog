const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const verify = require("./verifyToken");
const posts = require("../DB-models/posts");

//date generator function
function formatDate(date) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octoper",
    "November",
    "December"
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  return day + " " + monthNames[monthIndex] + " " + year;
}

const articleTime = formatDate(new Date());

// Admin Add Article Api
router.post("/", verify, async (req, res) => {
  const adminPost = new posts({
    image: req.body.image,
    title: req.body.title,
    body: req.body.text,
    categore : req.body.categore,
    time: articleTime
  });
  try {
    await adminPost.save();
    res.status(201).send("ADD POST OK");
  } catch {
    res.status(500).send(err);
  }
});
// Admin Article Upload image
router.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "NO File Upload" });
  }
  const id = crypto.randomBytes(20).toString("hex");
  const file = req.files.file;
 
  file.mv(`./client/build/uploades/${id + file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploades/${id + file.name}` });
  });
});

module.exports = router;
