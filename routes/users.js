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
        ref : 'post' // Reference to the Post model
      }
    ],
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    fullname: {
      type: String,

      trim: true
    },
    profileImage :{
      type : String,
      default : ""
    } ,
    boards:{
      type : Array,
      default:[]
    },
    savedPosts:[{
      type: mongoose.Schema.Types.ObjectId,
      ref : 'post',
      default : []
    }]
  }
);

userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);
