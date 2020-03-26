import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import AdminDash from './AdminDash';
import AddPost from './AddPost';
import AllPost from './AllPost';


const SupRoute = () => {
  
  return (
      <Router>  
        <AdminDash />
          <Switch> 
            <Route path="/admin/Add-Post" component={AddPost} />
            <Route path="/admin/All-Posts" component={AllPost} />
          </Switch> 
      </Router>
  )
}

export default SupRoute;