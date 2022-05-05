const express = require('express');
const router = express.Router();
const FetchUser = require("../middleware/FetchUser");
const Post = require('../models/Post');
const User = require('../models/User');

router.post('/getCurrentUser', FetchUser ,async (req, res) => {

    try {
        // @ts-ignore
        const user = await User.findById(req.user.id).populate("followers").populate("followings").select("-password -_v")
        
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})

router.get("/user/:id",async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
})

router.get("/account/edit",FetchUser,async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
})

router.post("/account/edit",FetchUser,async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
})  

router.post("/follow",FetchUser,async (req,res)=>{
    try {
        const {userId} = req.body
        // @ts-ignore
        const userToFollow = await User.findByIdAndUpdate(userId,{$addToSet:{followers:req.user.id}},{new:true})
        // @ts-ignore
        const followingUser = await User.findByIdAndUpdate(req.user.id,{$addToSet:{followings:userId}})
        res.json(userToFollow)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

router.post("/unfollow",FetchUser,async (req,res)=>{
    try {
        const {userId} = req.body
        // @ts-ignore
        const userToFollow = await User.findByIdAndUpdate(userId,{$pull:{followers:req.user.id}},{new:true})
        // @ts-ignore
        const followingUser = await User.findByIdAndUpdate(req.user.id,{$pull:{followings:userId}})
        res.json(userToFollow)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router
