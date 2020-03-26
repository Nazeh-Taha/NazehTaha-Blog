const jwt = require('jsonwebtoken');
// require('dotenv').config();
// const x = process.env.TOKEN_SECRET
// Helper function to protict client side route
export default function isLoging(){
    // console.log(x);
    const token = localStorage.getItem('token');
    let status = false; 
    if(token){
        const verified = jwt.verify(token, 'kjshdkaghdsa242kjhnfad26182kj');
        if(verified.admin === true){
            status = true;
        }
    }
    
 return status;  
};