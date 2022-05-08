const express = require('express');
const router = express.Router();
const FetchUser = require("../middleware/FetchUser");
const Post = require('../models/Post');
const User = require('../models/User');

router.post('/getCurrentUser', FetchUser ,async (req, res) => {

    try {
        // @ts-ignore
        const user = await User.findById(req.user.id).populate("followers").populate("followings").select("-password -_v -date")
        
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})

router.post("/getUser",async(req,res)=>{
    try {
        const {username} = req.body
        const user = await User.findOne({username}).select("-password -__v -email -date")
        const data = user.toObject()
        if (user){
            res.json({...data, followersCount:data.followers.length,followingsCount:data.followings.length})    
        } else {
            res.json(user)
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})

router.post("/checkFollow",FetchUser, async (req,res)=>{
    try {
        const {userId} = req.body
        // @ts-ignore
        const user = await User.findOne({id:req.user.id,followings:userId})
        console.log(user)
        if (user){
            res.json({following:true})
        } else {
            res.json({following:false})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
        
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
        const data = userToFollow.toObject()
        if (userToFollow){
            res.json({...data, followersCount:data.followers.length,followingsCount:data.followings.length})    
        } else {
            res.json(userToFollow)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

router.post("/unfollow",FetchUser,async (req,res)=>{
    try {
        const {userId} = req.body
        // @ts-ignore
        const userToUnfollow = await User.findByIdAndUpdate(userId,{$pull:{followers:req.user.id}},{new:true})
        // @ts-ignore
        const followingUser = await User.findByIdAndUpdate(req.user.id,{$pull:{followings:userId}})
        const data = userToUnfollow.toObject()
        if (userToUnfollow){
            res.json({...data, followersCount:data.followers.length,followingsCount:data.followings.length})    
        } else {
            res.json(userToUnfollow)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router
