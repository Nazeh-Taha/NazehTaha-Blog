import React from 'react';
import{
    BrowserRouter as Router,
    Route,
    Switch,
  } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ArticlePage from './ArticlePage';
import ArticleListPage from './ArticlesListPage';
import NotFoundPage from './NotFoundPage';
import NavBar from '../NavBar';
const RoutePage = () => (
    <>
    <Router> 
    <div className="App">
      {/* <NavBar /> */}
    <div id="page-body">
   <Switch>
      <Route path="/" component={HomePage} exact />
      <Route path="/about" component={AboutPage} />
      <Route path="/articles-list" component={ArticleListPage} />
      <Route path="/article/:name" component={ArticlePage} />
      <Route component={NotFoundPage} />
   </Switch>
      </div>
    </div>
   
    </Router>
   </>
)
export default RoutePage;