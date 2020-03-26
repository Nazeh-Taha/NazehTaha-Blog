const express = require("express");
const router = express.Router();
const Article = require("../DB-models/posts");
//get 9 new alrticles for home page
router.get("/", (req, res) => {
  Article.find()
    .limit(9)
    .sort({ date: -1 })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
});
module.exports = router;
