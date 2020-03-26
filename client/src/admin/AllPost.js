import React  from 'react';
import { Redirect } from 'react-router-dom';
import AdminDash from './AdminDash';
import isLoging from '../helper/isloged';


const Allpost = () => {
   
    if (!isLoging()) return <Redirect to ='/admin' />
    
    return (
        <>
        <AdminDash />
        <h1>All posts</h1>
        </>
    )
}

export default Allpost;