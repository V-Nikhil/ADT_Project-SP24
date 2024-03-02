const express = require('express');
const userModel = require('../models/userModel.js');
const { default: mongoose } = require('mongoose');
const expressAsyncHandler =require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcryptjs');
require('dotenv').config();

const loginController = () => { };

const generateToken = (id)=>{
    return jwt.sign(_id,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"30d"});
}

const registerController = expressAsyncHandler(async (req, res) => {
    const{username, email, password} = req.body;
    //check for all fields
    try{
        if(!username||!email||!password){
            res.send(400);
            throw Error("All necessary fields have not been filled");
        }
        // pre exisiting user
        const userExists = await userModel.findOne({email});
        if(userExists){
            throw Error("user Exists,please login");
        }

        const userNameExists=await userModel.findOne({username});
        if (userNameExists){
            throw Error("username already taken");
        }
        //creating a doc in db
        // const user=  await userModel.create({username, email, password});
        
            const hashedPassword = await bcrypt.hash(password,12);
            const user= await userModel.create({username, email, password:hashedPassword});
            if(user){
                res.status(201).json({
                    _is:user._id,
                    username : user.username,
                    email:user.email,
                    isAdmin:user.isAdmin,
                    token: generateToken(user._id)

                })
            }
    }
    catch(err){
        console.log("something went wrong",err);
    }
});

module.exports = {loginController, registerController};