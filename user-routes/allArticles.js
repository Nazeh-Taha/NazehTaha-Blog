const express = require("express");
const router = express.Router();
const Article = require("../DB-models/posts");

router.post("/", (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  Article.find()
    .sort([["_id", "desc"]])
    .skip(skip)
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).json({ success: false, err });
      res
        .status(200)
        .json({ success: true, articles, articleSize: articles.length });
    });
});

module.exports = router;
