import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import AdminLogin from "./admin/AdminLogin";
import AllPost from "./admin/AllPost";
import AddPost from "./admin/AddPost";
import HomePage from "./pages/HomePage";
import Article from "./pages/Article";
import ContactMe from "./pages/ContactMe";
import AboutPage from "./pages/AboutPage";
import AllArticle from "./pages/AllArticle";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Admin Route */}
        <Route path="/admin" component={AdminLogin} exact />
        <Route path="/admin/Add-Post" component={AddPost} />
        <Route path="/admin/All-Posts" component={AllPost} />
        {/* Wepsite Route */}
        <Route path="/" component={HomePage} exact />
        <Route path="/article/:id" component={Article} />
        <Route path="/articles-list" component={AllArticle} />
        <Route path="/contact" component={ContactMe} />
        <Route path="/about" component={AboutPage} />
      </div>
    </Router>
  );
}

export default App;
