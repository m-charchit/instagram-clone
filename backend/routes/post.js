const express = require("express");
const router = express.Router();
const FetchUser = require("../middleware/FetchUser");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

router.get("/fetch", FetchUser ,  async (req, res) => {
  try {
    // @ts-ignore
    const posts = await Post.find({user:{$in:req.user.followings}});
    res.json(posts)
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/fetchUserPosts",async (req,res) => {
  try {
    const {username} = req.body
    // @ts-ignore
    const posts = await Post.find({username});
    res.json(posts)
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
})

router.post("/upload", FetchUser, async (req, res) => {
  try {
    const { caption } = req.body;
    // @ts-ignore
    const post = await Post({ caption, user: req.user.id }).save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});


router.post("/like", FetchUser, async (req, res) => {
  try {
    const { postId } = req.body;
    // @ts-ignore
    const findPost = await Post.findOne({id:postId,like:req.user.id})
    if(findPost){
      // @ts-ignore
      const likedPost = await Post.findByIdAndUpdate(postId,{$pull:{like:req.user.id}},{new:true})
    res.json(likedPost);

    }
    else{
    const likedPost = await Post.findByIdAndUpdate(
      postId,
      // @ts-ignore
      { $addToSet: { like: req.user.id } },
      { new: true }
    );
    res.json(likedPost);
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/edit",FetchUser,async (req,res)=>{
  try {
    const { caption,postId } = req.body;
    // @ts-ignore
    const post = await Post.findOneAndUpdate({_id:postId,user:req.user.id},{caption:caption},{new:true});
    res.json(post);    
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
})
router.post("/delete",FetchUser,async (req,res)=>{
  try {
    const { postId } = req.body;
    // @ts-ignore
    const post = await Post.findOneAndDelete({_id:postId,user:req.user.id})
    const comment = await Comment.deleteMany({post:postId})
    
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router;
