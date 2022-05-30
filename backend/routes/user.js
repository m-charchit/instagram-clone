const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const FetchUser = require("../middleware/FetchUser");
const User = require('../models/User');

router.post('/getCurrentUser', FetchUser ,async (req, res) => {

    try {
        // @ts-ignore
        const user = await User.findById(req.user.id)
        .populate("followers","_id username name").populate("followings","_id username name")
        .select("-password -_v -date")
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})
const paginate = async (userId,page,followType) => {
    let limit = 2
    userId = mongoose.Types.ObjectId(userId)
    console.log(userId)
        const totalDocs = await User.aggregate([
            {$match:{_id:userId}},
            {$project: {_id: 0, dataSize: {$size: `$${followType}`}}}
        ])
        console.log(totalDocs)
        console.log(page)

        let hasNextPage = (Math.ceil(totalDocs[0].dataSize / limit) || 1) > page
        let details = {
            nextPage:hasNextPage ? page+1 : null,
            hasNextPage,
            totalDocs:totalDocs[0].dataSize
        }
        const follow_ers_ing = await User.findById(userId).populate(
        [{
            path: followType,
            select:"_id username name",
            options:{
                skip:(page-1)*limit,limit
            }
        }]
        ).select(followType)
        let result = {}
        result[followType] = {docs:follow_ers_ing[followType],...details}
        return result
        
}
router.post("/getFollows",async(req,res)=>{
    try {
        const {userId,page,followType} = req.body
        const data = await paginate(userId,page,followType)
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})
router.post("/getUser",async(req,res)=>{
    try {
        const {username} = req.body
        const user = await User.findOne({username}).select("_id username name")
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})

router.post("/checkFollow",FetchUser, async (req,res)=>{
    const {userId} = req.body
    try {
        // @ts-ignore
        const user = await User.findOne({_id:req.user.id,followings:userId})
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

router.post("/searchUser", async (req,res)=>{
    try {
        const {search} = req.body
        const users = await User.find({username:new RegExp(search,"i")}).select("_id username name")
        res.json(users)

    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})

router.get("/getSuggestedUsers",FetchUser,async(req,res)=> {
    try {
        // @ts-ignore
        let userId = mongoose.Types.ObjectId(req.user.id)
        const users = await User.aggregate([
            {$match:{
                "_id":{$ne:userId},
                "followers":{$ne:userId}
        }},
            {$sample: {size: 5}},
            {$project:{username:1,_id:1,name:1}}
        ])
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})

router.post("/account/edit",FetchUser,async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
})  

router.post("/follow",FetchUser,async (req,res)=>{
    try {
        const {userId,pUserId} = req.body
        // @ts-ignore
        if (userId!=req.user.id){
        // @ts-ignore
        const followedUser = await User.findByIdAndUpdate(userId,{$addToSet:{followers:req.user.id}})
        
        // @ts-ignore
        const followingUser = await User.findByIdAndUpdate(req.user.id,{$addToSet:{followings:userId}},{new:true})
        .populate("followers","_id username name").populate("followings","_id username name")
        .select("_id username name")

        const user = await User.findById(pUserId)
        .select("_id username name")

        res.json({followingUser,user})
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
        const {userId,pUserId} = req.body
        // @ts-ignore
        if(userId != req.user.id){
            // @ts-ignore
        const followedUser = await User.findByIdAndUpdate(userId,{$pull:{followers:req.user.id}})
        
        
        // @ts-ignore
        const followingUser = await User.findByIdAndUpdate(req.user.id,{$pull:{followings:userId}},{new:true})
        .populate("followers","_id username name").populate("followings","_id username name")
        .select("_id username name")
        const user = await User.findById(pUserId)
        .select("_id username name")
        res.json({followingUser,user})
    } else {
        res.status(401).send("Not Allowed")
    }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router
