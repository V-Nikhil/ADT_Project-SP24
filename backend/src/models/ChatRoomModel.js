const mongoose = new require('mongoose');

const chatRoomSchema = mongoose.Schema({
  isGroupChat :{type: Boolean, default:false},
  chatName:{type:String, trim:ture},
  users:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
  latestMessage :{type:mongoose.Schema.Types.ObjectId, ref:'Messages'},
  groupAdmin:{ type:mongoose.Schema.Types.ObjectId, ref:'User'},
  groupPic:{type:String},

},{ timestamps: true });
module.exports = mongoose.model('ChatRoom',chatRoomSchema);