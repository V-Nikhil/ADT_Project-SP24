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

Router.route("/").post(accessChat);
Router.route("/").get(fetchChats);
Router.route("/createGroup").post(createGroupChat);
Router.route("/fetchGroups").get(fetchGroups);
Router.route("/groupExit").put(groupExit);

module.exports = Router;
