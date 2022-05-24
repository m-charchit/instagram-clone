const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const FetchUser = require("../middleware/FetchUser");
const Post = require("../models/Post");

const options = {
  limit: 1,
  select:"-_v",
  populate:[{path:"user",select:"_id username"},{path:"like",select:"_id username name"},
  {path:"comments.user",select:"_id username"}]
};

router.get("/fetch", FetchUser ,  async (req, res) => {
  try {
    console.log(req.query.page)
    // @ts-ignore
    const posts = await Post.paginate({user:{$in:[req.user.followings,req.user.id]}},{...options,page:req.query.page})
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
    res.json(post)
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
})

router.post("/fetchUserPosts",async (req,res) => {
  try {
    const {userId,page} = req.body
    console.log(userId,page)
    // @ts-ignore
    const posts = await Post.paginate({user:userId},{limit:3,select:"_id like comments",page:page})
    res.json(posts)
    // @ts-ignore
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
    console.log(postId)
    // @ts-ignore
    console.log(await Post.findOneAndDelete({_id:postId,user:req.user.id}))
    const posts = await Post.find({user:{$in:[req.user.followings,req.user.id]}})
    .populate("user","_id username").populate("like","_id username name").populate("comments.user","_id username").select("-_v")
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
})

async function getId(result,finalList){
  for(let i of result){
      let a  = await Post.aggregate([
        {$match:{"comments.parentComment":i._id}},
        {$project: {
          comments:{$filter: {
            input: '$comments',
            as: 'comment',
            cond: {$eq: ['$$comment.parentComment', i._id]}
        }},
        }}
      ])
      if(a.length!=0) a = a[0].comments
      finalList.push(i._id)
      if (a.length != 0 && result.indexOf(i)==result.length-1){
          await getId(a,finalList)
      } else if (result.indexOf(i)!=result.length-1) {
          continue
      } else{
          return finalList
      }
  }
  return finalList
}

router.post("/deleteComment",FetchUser,async(req,res)=>{
    try {
      const {commentId} = req.body    
      // @ts-ignore
      const post = await Post.findOne({"comments.user":req.user.id,"comments._id":commentId},{"comments.$":1})
      const a = await getId(post.comments,[])
      // @ts-ignore
      const posts = await Post.findOneAndUpdate({"comments.user":req.user.id,"comments._id":commentId},{$pull:{"comments":{_id:a}}},{new:true})
      .populate("user","_id username").populate("like","_id username name").populate("comments.user","_id username").select("-_v")
      res.json(posts)
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
})

router.post("/addComment",
[body('com','Enter a Valid comment').trim().notEmpty().isLength({max:120})],
FetchUser,async( req, res )=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {    
        return res.status(400).json({ errors: errors.array() });
    }
    const {com,postId,parentCommentId} = req.body
    const post = await Post.findByIdAndUpdate(postId,{$push: {comments:{comment:com,parentComment:parentCommentId,post:postId,user:req.user.id}}},{new:true})
    .populate("user","_id username").populate("like","_id username name").populate("comments.user","_id username").select("-_v")
    res.json(post)
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router;
