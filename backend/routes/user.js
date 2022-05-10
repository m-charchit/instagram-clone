const express = require('express');
const router = express.Router();
const FetchUser = require("../middleware/FetchUser");
const Post = require('../models/Post');
const User = require('../models/User');

router.post('/getCurrentUser', FetchUser ,async (req, res) => {

    try {
        // @ts-ignore
        const user = await User.findById(req.user.id).select("-password -_v -date")
        
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})

router.post("/getUser",async(req,res)=>{
    try {
        const {username} = req.body
        const user = await User.findOne({username}).populate("followers","_id username name").populate("followings","_id username name").select("-password -__v -email -date")
        res.json(user)

        
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})

router.post("/checkFollow",FetchUser, async (req,res)=>{
    try {
        const {userId} = req.body
        console.log(userId)
        // @ts-ignore
        const user = await User.findOne({id:req.user.id,followings:userId})
        console.log(user)
        if (user){
            res.json({followingUser:true})
        } else {
            res.json({followingUser:false})
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
        if (userId!=req.user.id){
        // @ts-ignore
        const userToFollow = await User.findByIdAndUpdate(userId,{$addToSet:{followers:req.user.id}},{new:true})
        // @ts-ignore
        const followingUser = await User.findByIdAndUpdate(req.user.id,{$addToSet:{followings:userId}})
        res.json(userToFollow)
    }   else {
        res.status(401).send("Not Allowed")
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
        if(userId != req.user.id){
        const userToUnfollow = await User.findByIdAndUpdate(userId,{$pull:{followers:req.user.id}},{new:true})
        // @ts-ignore
        const followingUser = await User.findByIdAndUpdate(req.user.id,{$pull:{followings:userId}})
        res.json(userToUnfollow)
    } else {
        res.status(401).send("Not Allowed")
    }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router
