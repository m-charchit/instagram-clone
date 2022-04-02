const mongoose = require('mongoose');
const { Schema } = mongoose
const CommentSchema = new Schema({
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
        ref:"comment"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"post"
    }
})
module.exports = mongoose.model('comment', CommentSchema);
