const express = require('express');
const router = express.Router();
const FetchUser = require("../middleware/FetchUser");
const Post = require('../models/Post');


router.get("/fetchPosts",async(req,res)=>{
    
})

router.post("/upload", FetchUser , async (req,res)=>{
    try {
        
        const {caption} = req.body
        // @ts-ignore
        const post = await Post({ caption,user:req.user }).save()
        res.json(post)
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }

})



module.exports = router