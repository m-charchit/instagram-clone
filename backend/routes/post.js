const express = require("express");
const router = express.Router();
const FetchUser = require("../middleware/FetchUser");
const Post = require("../models/Post");

router.get("/fetchPosts", async (req, res) => {});

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


router.post("/likePost", FetchUser, async (req, res) => {
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

module.exports = router;
