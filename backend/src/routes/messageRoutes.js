const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controllers/messageController.js");
const { protect } = require("../middleware/authMiddleware");

const Router = express.Router();

Router.get("/:chatId",protect, allMessages);
Router.post("/",protect, sendMessage);

module.exports = Router;