const mongoose = require('mongoose');
const { Schema } = mongoose
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name :{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    bio:{
        type:String,
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    }],
    followings:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    }],
    private:{
        type:Boolean,
        default:true
    }
});
const user = mongoose.model('user', UserSchema);
module.exports = user
