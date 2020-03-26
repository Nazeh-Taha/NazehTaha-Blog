const express = require("express");
const router = express.Router();
// All articles fron DB
const Article = require("../DB-models/articles");
//GET all articles from DB
router.get("/", (req, res) => {
  Article.find()
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
});

//POST article in the DB
router.post("/", (req, res) => {
  const myArticle = new Article({
    name: req.body.name,
    title: req.body.title,
    content: req.body.content
  });

  myArticle
    .save()
    .then(result => {
      res.status(201).json({
        message: "Handling POST request to /api/articles - SUCCESS!",
        result
      });
    })
    .then(err => {
      res.status(500).json({ message: err });
    });
});
module.exports = router;
