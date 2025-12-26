const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    // Reference to the User who created the post
    // This will create a relationship between Post and User models
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    img:{
        type: String,
    },
    
    description: String ,
   likes: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'user',
  default: []
}]

    
});

module.exports = mongoose.model('post', postSchema);
