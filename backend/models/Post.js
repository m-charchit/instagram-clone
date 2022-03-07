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

})

module.exports = mongoose.model('post', PostSchema);