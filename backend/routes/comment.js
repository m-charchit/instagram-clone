const express = require('express');
const router = express.Router();
const FetchUser = require("../middleware/FetchUser");
const Post = require('../models/Post');
const Comment = require("../models/Comment")

router.post("/fetchComments", async(req,res)=>{
    try {
        const {postId} = req.body
        const comments = await Comment.find({post:postId})
        res.json(comments)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})
router.post("/write", FetchUser , async(req,res)=>{
    try {
        const {com,postId,parentCommentId} = req.body
        // @ts-ignore
        const comment = await Comment({comment:com,parentComment:parentCommentId,post:postId,user:req.user.id}).save()
        
        res.json(comment)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})
router.post("/edit", FetchUser ,(req,res)=>{

})
router.post("/delete", FetchUser , async (req,res)=>{
    try {
        const {commentId} = req.body
        await Comment.deleteMany({parentCommentId:commentId})
        const comment = await Comment.findByIdAndDelete(commentId)
        res.json(comment)
    } catch (error) {
        
    }
})

module.exports = router
