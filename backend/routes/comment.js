const express = require('express');
const router = express.Router();
const FetchUser = require("../middleware/FetchUser");
const Post = require('../models/Post');
const Comment = require("../models/Comment")

router.post("/fetchComments", FetchUser ,async(req,res)=>{
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
router.post("/edit", FetchUser , async (req,res)=>{
    try {
        const {commentId,com} = req.body
        // @ts-ignore
        const comment = await Comment.findOneAndUpdate({_id:commentId,user:req.user.id},{comment:com},{new:true})
        res.json(comment)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

async function getId(result,finalList){
    for(let i of result){
        let a  = await Comment.find({parentComment:i._id})
        finalList.push(i._id)
        if (a.length != 0 && result.indexOf(i)==result.length-1){
            await getId(a,finalList)
        } else if (result.indexOf(i)!=result.length-1) {
            continue
        } else{
            return 
        }
    }
    return finalList
}

router.post("/delete", FetchUser , async (req,res)=>{
    try {
        const {commentId} = req.body    
        
        // @ts-ignore
        const a = await getId([await Comment.findOne({_id:commentId,user:req.user.id})],[])
        // @ts-ignore
        await Comment.deleteMany({_id:{$in:a}})
        
        res.json(a)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})



module.exports = router
