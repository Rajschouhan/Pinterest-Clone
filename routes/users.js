const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/pinterest');
const plm = require("passport-local-mongoose");


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, 
      trim: true
    },
    password: {
      type: String,
      
    },
    posts: [ 
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post' // Reference to the Post model
      }
    ],
    dp: {
      type: String, // URL of the display picture
      default: ''
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    fullname: {
      type: String,

      trim: true
    }
  }
);

userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);
