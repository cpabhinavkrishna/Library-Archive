require('dotenv').config();
const port = process.env.APP_SERVER_PORT
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const path = require("path");
const cors = require("cors");
const bcrypt = require('bcrypt');
const Users = require('./model/user.model');
const Books = require('./model/book.model');
app.use(express.json());
app.use(cors());
const dbURL = process.env.DB_URL
 //making database connection
mongoose.connect(dbURL); 
//Endpoints
app.get("/",(req,res)=>{
    res.send("app is working!!!")
})

//exposing static files to the client
app.use("/files",express.static('uploads/files'))
app.use("/images",express.static('uploads/images'))

//Register user endpoint
app.post("/createuser",async (req,res)=>{
    const user = {
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
      }
      console.log(user);     
    try{
      const duplicateUser =  await Users.findOne({
            email:user.email
        });
        console.log(duplicateUser);
        if( !duplicateUser){
            const hashedPwd = await bcrypt.hash(user.password,10);
           try{
            Users.create({
                name: user.name,
                email:user.email,
                password:hashedPwd
               });
           }catch(err){
            res.status(500).json({success:false,error:"oops something went wrong"})
           }
            res.status(201).json({success:true,message:"user created successfuly!"})
        }else res.status(400).json({success:false,error:"user already present"});
    } catch(err){
        console.log(err);
        res.status(500).json({success:false,error:"oops something went wrong"})
    } 
})

//get all books 
app.get("/allbooks",async (req,res)=>{
    let books = await Books.find({});
    res.status(200).send(books);
})

app.get("/usersubscriptiondata/:email",async (req,res)=>{
    let user ;
    try{
       user = await Users.findOne({email:req.params.email});
    }catch(e){
        res.status(500).send("error");
    }
   if(user)res.status(200).send({user});
   else res.status(500).send("error");
})

//custom middleware function
function authentication(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1];
    console.log(token);
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(!err)next();
        else res.status(500).send({result:"Request forbidden",error:err})
    })
}

//API Creation
app.listen(port,(error)=>{
    if(!error){
        console.log("server running on: "+port);
    }else{
        console.log("error occured: "+err);
    }
})

