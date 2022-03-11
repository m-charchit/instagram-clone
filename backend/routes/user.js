const express = require('express');
const router = express.Router();
const FetchUser = require("../middleware/FetchUser");
const Post = require('../models/Post');
const User = require('../models/User');

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

module.exports = router
