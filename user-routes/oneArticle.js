const express = require("express");
const router = express.Router();
const Article = require("../DB-models/posts");
const Comments = require("../DB-models/comments");

//find article by id
router.get("/:id", async (req, res) => {
  try {
    const x = req.params.id;
    const oneArticle = await Article.findOne({ _id: x });
    res.status(200).json(oneArticle);
  } catch (err) {
    res.status(500).json({ message: "Error connecting to db", err });
  }
});
//git time

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const time = hours + ":" + minutes + " " + ampm;
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
  return (
    "Posted at " + time + ", " + day + " " + monthNames[monthIndex] + " " + year
  );
}

const commentTime = formatDate(new Date());

//save comments in DB
router.post("/comments", async (req, res) => {
  const commentInfo = new Comments({
    postId: req.body.postId,
    name: req.body.name,
    picture: req.body.picture,
    comment: req.body.comment,
    time: commentTime
  });
  try {
    await commentInfo.save();
    res.status(201).send("ADD commment OK");
  } catch (err) {
    res.status(500).json({ message: "Error send comment", err });
  }
});
//get comments from db
router.get("/comments/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const commentResult = await Comments.find({ postId: id });
    res.status(200).json(commentResult);
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;
