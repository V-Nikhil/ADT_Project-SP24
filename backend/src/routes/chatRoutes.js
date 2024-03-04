const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  groupExit,
  fetchGroups,
} = require("../controllers/chatController.js");
const { protect } = require("../middleware/authMiddleware");

const Router = express.Router();

Router.use(protect);

Router.route("/").post( accessChat)
                 .get( fetchChats);
Router.post("/createGroup", createGroupChat);
Router.get("/fetchGroups",fetchGroups);
Router.put("/groupExit", groupExit);

module.exports = Router;
