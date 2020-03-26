const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 8000;
const {resolve} = require('path')
require("dotenv").config();

//Connect to mongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("connected to database"))
  .catch(err => console.log(err));

//Middleware
app.use(express.static(path.join(__dirname, "/build")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

const articlesRouter = require("./routes/allArticles"); // text
//for user
const newArticle = require("./user-routes/newArticle");
const oneArticle = require("./user-routes/oneArticle");
const sendMail = require("./user-routes/sendMail");
const allArticles = require("./user-routes/allArticles");
//for admin
const adminRouter = require("./routes/adminRoute");
const adminPost = require("./routes/adminPosts");
//Route Middleware
//app.use("/", articlesRouter); //test
app.use("/api/articles", articlesRouter); //test
//user route Middleware
app.use("/api", sendMail);
app.use("/api/newArticle", newArticle);
app.use("/api/article", oneArticle);
//admin route Middleware
app.use("/api/admin", adminRouter);
app.use("/api/admin/posts", adminPost);
app.use("/api/allarticles", allArticles);

 //if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
//}

app.listen(PORT, () => {
  console.log("listen to port 8000");
});
