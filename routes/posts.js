const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    imgText:{
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
    createdAt:{
        type : Date,
        default : Date.now,
    },
    likes:{
        type: Array,
        default:[],
    },
});

module.exports = mongoose.model('Post', postSchema);
