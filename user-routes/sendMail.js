const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv/config");

router.post("/send-email", async (req,res) => {
 const output =`
 <p>Email From Blog</p>
 <h1>Contact Info</h1>
 <ul>
 <li>name: ${req.body.name}</li>
 <li>email: ${req.body.email}</li>
 </ul>
 <h3>Message</h3>
 <p>${req.body.message}</p>
 `;

   // create reusable transporter object using the default SMTP transport
   const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
        secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
   });
 
   // send mail with defined transport object
   let info = {
     from: req.body.email, // sender address
     to: "nazeh3036@gmail.com", // list of receivers
     subject: "Email From Blog", // Subject line
     text: "Hello world?", // plain text body
     html: output // html body
   };
 try{
  await transporter.sendMail(info);
  res.status(201).send("send mail");
 }catch(err){
  res.status(500).send(err);
  console.log(err)
 }

})







module.exports = router;