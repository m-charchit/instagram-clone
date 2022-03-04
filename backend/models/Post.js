const mongoose = require('mongoose');
const { Schema } = mongoose

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
      
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },

})
const post = mongoose.model('user', PostSchema);
module.exports = post
