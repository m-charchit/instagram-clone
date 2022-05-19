const express = require("express");
const router = express.Router();
const FetchUser = require("../middleware/FetchUser");
const Post = require("../models/Post");

router.get("/fetch", FetchUser ,  async (req, res) => {
  try {
    // @ts-ignore
    const posts = await Post.find({user:{$in:req.user.followings}})
    .populate("user","_id username").populate("like","_id username name").populate("comments.user","_id username").select("-_v")
    res.json(posts)
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/fetchPost",FetchUser, async (req,res) => {
  try {
    const {postId} = req.body
    const post = await Post.findById(postId)
    .populate("user","_id username").populate("like","_id username name").populate("comments.user","_id username").select("-_v")
    post.comments.forEach((e)=>{
      
    })
    res.json(post)
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
})

router.post("/fetchUserPosts",async (req,res) => {
  try {
    const {userId} = req.body
    // @ts-ignore
    const posts = await Post.find({user:userId});
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
    const findPost = await Post.findById(postId).findOne({like:req.user.id})
    if(findPost){
      // @ts-ignore
      const likedPost = await Post.findByIdAndUpdate(postId,{$pull:{like:req.user.id}},{new:true})
      .populate("user","_id username").populate("like","_id username name").populate("comments.user","_id username").select("-_v")
    res.json(likedPost);

    }
    else{
    const likedPost = await Post.findByIdAndUpdate(
      postId,
      // @ts-ignore
      { $addToSet: { like: req.user.id } },
      { new: true }
    ).populate("user","_id username").populate("like","_id username name").populate("comments.user","_id username").select("-_v")
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
    
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
})

router.post("/addComment",FetchUser,async( req, res )=>{
  try {
    const {com,postId,parentCommentId} = req.body
    // await Post.findByIdAndUpdate(postId,{$set:{comments:[]}})
    // @ts-ignore
    const post = await Post.findByIdAndUpdate(postId,{$push: {comments:{comment:com,parentComment:parentCommentId,post:postId,user:req.user.id}}},{new:true})
    .populate("user","_id username").populate("like","_id username name").populate("comments.user","_id username").select("-_v")
    res.json(post)
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router;
