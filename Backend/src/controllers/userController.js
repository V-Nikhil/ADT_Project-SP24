const express = require('express');
const userModel = require('../models/userModel.js');
const { default: mongoose } = require('mongoose');
const expressAsyncHandler =require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcryptjs');
require('dotenv').config();
 
const loginController = expressAsyncHandler(async(req,res) => { 
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if (!user) {
        return res.status(401).json({message: "User not found"});
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token // Include this in the response
        });
    } else {
        res.status(401).json({message: "Invalid credentials"});
    }
});

// const generateToken = (id)=>{
//     return jwt.sign({id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"30d"});
// }

const registerController = expressAsyncHandler(async (req, res) => {
    const{name, email, password} = req.body;
    //check for all fields
    
        if(!name||!email||!password){
            res.sendStatus(400);
            throw Error("All necessary fields have not been filled");
        }
        // pre exisiting user
        const userExists = await userModel.findOne({email});
        if(userExists){
            throw Error("user Exists,please login");
        }

        const userNameExists=await userModel.findOne({name});
        if (userNameExists){
            throw Error("username already taken");
        }
        //creating a doc in db
        // const user=  await userModel.create({username, email, password});
            const salt= await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password,salt);
            const user= await userModel.create({name, email, password:hashedPassword});
            if(user){
                console.log("registration successful"); 
                res.status(200).json({
                    id:user._id,
                    name : user.name,
                    email:user.email,
                    // isAdmin:user.isAdmin,
                    // token: generateToken(user._id)

                });
                console.log("registration successful",user);
            }else{
                console.log("registration error",err);
            }
});

// const fetchAllUsersController = expressAsyncHandler(async (req, res) => {
//     const users = await UserModel.find({
//                 $or: [ 
//                     { name: { $regex: req.query.search, $options: "i" } }, 
//                     { email: { $regex: req.query.search, $options: "i" } } 
//                 ] 
//             }).find({ _id: { $ne: req.user._id } },);
//     res.send(users);
//   });

module.exports = {loginController, registerController};