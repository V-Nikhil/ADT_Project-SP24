const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  content:{type:String,required: true},
  attachment:{ type: String},
  sender :{type:mongoose.Schema.Types.ObjectId,ref:'User',required: true},
  reciever:{type: mongoose.Schema.Types.ObjectID, ref:'User',required: true},
  chat:{type:mongoose.Schema.Types.ObjectId, ref: 'ChatRoom',required: true},
},{timeStamp: true});

module.exports = mongoose.model('Messages',messageSchema);

