const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content:{type:String},
  attachment:{ type: String},
  sender :{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  chat:{type:mongoose.Schema.Types.ObjectId, ref: 'ChatRoom'},
},{timestamps:true});

module.exports = mongoose.model('Messages',messageSchema);

