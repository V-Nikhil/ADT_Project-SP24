const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {type: String,required: true},
  sender: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
  // If implementing chat rooms, include a reference to the chat room model
  // chatRoom: {type: mongoose.Schema.Types.ObjectId,ref: 'ChatRoom',required: true}
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
