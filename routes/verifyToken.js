const jwt = require('jsonwebtoken');
// Check token Middlware
module.exports = function (req, res, next){
  const token = req.body.token;
  if(!token) return res.status(401).send('Access Denied');

  try{
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
     if(verified.admin !== true) return res.status(401).send('Access Denied'); 
     req.user = verified;
     next();
  }catch(err){
     res.status(400).send('Invalid Token');
  }
}