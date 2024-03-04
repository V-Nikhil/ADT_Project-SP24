const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chatRoomModel");
const User = require("../models/userModel");

const accessChat = expressAsyncHandler( async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }
    var isChat = await Chat.find({
        isGroupChat: false,{ users: {$all:[req.user._id,userId]} },
      })
        .populate("users", "-password")
        .populate("latestMessage")
        .populate({path:"latestMessage.sender",
                select:"name email"
                });
    if (isChat.length > 0) {
        res.send(isChat[0]);
    }else{
        var chatData ={
            isGroupChat=false,
            chatName ="sender",
            users:[req.user._id,userId]
        }
    }
    try{
        const createdChat =await chatData.create(chatData);
        const fullChat = await Chat.findOne({_id:createdChat._id})
                        .populate("users","-password");
        res.sendStatus(200).json(fullChat);
    }catch(error){
        res.status(400).send(error.message);
    }
  });

const fetchChats = expressAsyncHandler(async (req, res) => {
    try {
      console.log("Fetch Chats aPI : ", req);
      var results = await Chat.find({{ users: req.user._id }})
                                .populate("users", "-password")
                                .populate("groupAdmin", "-password")
                                .populate("latestMessage")
                                .sort({ updatedAt: -1 });
        results =await User.populate(results, {
                                    path: "latestMessage.sender",
                                    select: "name email",
                                    });
          res.status(200).send(results);
        } catch (error) {
      res.status(400).send(error.message);
    }
});

const fetchGroups = expressAsyncHandler(async (req, res) => {
    try {
      const allGroups = await Chat.where("isGroupChat").equals(true);
      res.status(200).send(allGroups);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

const createGroupChat = expressAsyncHandler((req,res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Data is insufficient" });
    }
    var users = JSON.parse(req.body.users);
    console.log("chatController/createGroups : ", req);
    users.push(req.user);

    try {
        const groupChat = await Chat.create({
          chatName: req.body.name,
          users: users,
          isGroupChat: true,
          groupAdmin: req.user,
        });
        
        const fullGroupChat = await chatData.findOne({{ _id: groupChat._id }})
                                            .populate("users","-password")
                                            .populate("groupAdmin","-password");
        res.status(200).json(fullGroupChat);
    } catch(error){
        res.status(400).send(error.message);
    }
});

const groupExit = expressAsyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const reqChat = await Chat.findOne(chatId).populate("groupAdmin","-password");
    if(!reqChat){
        res.status(404).send({message:"chat not found"});
    }
    if(reqChat.groupAdmin.name.tostring()!==req.user._id.toString()){
        return res.status(403).send({ message: "Unauthorized: Only the group admin can remove users." });
    }
  
    const removed = await Chat.findByIdAndUpdate(chatId
                        ,{ $pull: { users: userId }},{new: true})
                    .populate("users", "-password")
                    .populate("groupAdmin", "-password");
  
    if (!removed) {
      res.status(404).send("Chat Not Found");
    } else {
      res.json(removed);
    }
  });





  
