const mongoose = require('mongoose');
const { Schema } = mongoose

const commentSchema = new Schema({
    comment:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    parentComment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comment.c"
    },
    childComments:[],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },

})

const modelComment = new Schema({
  c:[commentSchema]
})

const PostSchema = new Schema({
    caption : {
        type: String,
        required: true
    },
    postImage: {
        url: {
          type: String,
          required: true,
          default: "http://127.0.0.1:3000/images/defaultPost.jpg",
        },
        filename: {
          type: String,
          required: true,
          default: "images/defaultPost.jpg",
        },
      },
      like:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"user"
      }],
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
      },
      date: {
        type: Date,
        default: Date.now
    },
    comments:[commentSchema]

})
mongoose.model('comment', modelComment);
module.exports = mongoose.model('post', PostSchema);