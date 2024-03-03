const mongoose= require('mongoose');

const userSchema =  mongoose.Schema({
  name: {type: String,required: true,unique: true},
  email: {type: String,required: true,unique: true},
  password: {type: String,required: true},
},{timeStamp : true});

module.exports= mongoose.model('User', userSchema);



















// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const userSchema = new mongoose.Schema({
//   username: {type: String,required: true,unique: true,trim: true},
//   email: {type: String,required: true,unique: true,trim: true},
//   password: {type: String,required: true},
//   // Optional fields for profile information
//   displayName: String,
//   profilePicture: String,
// }, { timestamps: true });

// // Hash password before saving
// userSchema.pre('save', async function(next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 8);
//   }
//   next();
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
