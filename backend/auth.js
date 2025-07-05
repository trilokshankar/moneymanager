const express=require('express');
const router=express.Router();
const User=require('User');
const bcrypt=require('bcrypt');
const user = require('./user');

user.post("/register",async(req,res)=>{
    const{username,password}=req.body;
    const existing=await Useer.findOne({username});
    if(existing) return res.status(400).json({message:"User exists"});

    const user=new User({username,password});
    await user.save();
    res.json({message:"User registered"});
})

user.post("/login",async(req,res)=>{
    const {username,password}=req.body;
    const user=await user.findOne({username,password});
    if(!user) return res.status(401).json({message:"User not found"});


    currentuser=username
    res.json({message:"Login succesfull"});
})

user.post("/logout",async(req,res)=>{
    currentUser=null;
    res.json({message:"Logged out"})
})





