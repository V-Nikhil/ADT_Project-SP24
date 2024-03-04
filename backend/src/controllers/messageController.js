const express = require('express');
const User = require('../models/userModel.js');
const Message = require('../models/messageModel.js');
const Chat = require('../models/chatRoomModel.js');
const { default: mongoose } = require('mongoose');
const expressAsyncHandler =require('express-async-handler');

const allMessages = expressAsyncHandler(async(req,res)=>{
    try{
        const messages = await messages.find({chat:req.params.chatId})
                    .populate("sender", "name email")
                    .populate("reciever")
                    .populate("chat")
                    .lean();
        
        res.json(messages);
    }catch(error){
        res.status(400).send(error.message);
    }
});

const sendMessage= expressAsyncHandler(async (req,res)=>{
    const {content, chatId}= req.body;
    if(!content || !chatId){
        console.log("Invalid data passed into request");
        return res.status(400).send();
    }
    var newMessage = {
        sender: req.user._id,
        content : content,
        chat :chatId
    }

    try{
        var message = await Message.create(newMessage);
        console.log(message);
        message = await message.populate("sender","name email")
                                .populate("chat")
                                .populate("reciever");
        message= await User.populate(message,{
                                            path: "chat.users",
                                            select :"name email"
                                        });
        await Chat.findByIdAndUpdate(req.body.chatId,{ latestMessage: message });
        res.json(message);
    } catch(error){
        res.status(400).send(error.message);
    }

    });

module.exports = {allMessages,sendMessage}