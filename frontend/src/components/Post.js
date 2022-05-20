// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addComment, fetchPost, likePost, organizeComments } from '../state/Actions/post'
import { followActions } from '../state/Actions/user'
import UserDialog from './UsersDialog'


function Post() {
  // @ts-ignore
  const {currentUser} = useSelector((state) => state.user)
  // @ts-ignore
  let {posts:post} = useSelector((state)=>state.post)
  const dispatch = useDispatch()
  const [showLikeElem, setShowLikeElem] = useState(false)
  const [replyCommentId, SetReplyCommentId] = useState(undefined)
  const [comment, setComment] = useState("")
  const inputEl = useRef(null)
  const replyToEl = useRef(null)

  const {postId} = useParams()
  
  useEffect(() => {
    dispatch(fetchPost(postId)).then((data)=>{
      dispatch(organizeComments(data))
    })
    
  }, [dispatch])
  
  const likePosts = () => {
    dispatch(likePost(post[0]._id))
  }
  const showElem = () => { 
    setShowLikeElem(true)
  }
  const followAction = (type ,userId) => {
    dispatch(followActions(userId,type)) 
    
  }
  const InputHandle = (e) => {
    setComment(e.target.value)
  }
  const replyComment = (comId,username) => {
    SetReplyCommentId(comId)
    replyToEl.current.parentElement.classList.remove("hidden")
    replyToEl.current.innerText = `Replying to ${username}`
    inputEl.current.focus()
  }
  const removeReplyBox = () => {
    SetReplyCommentId(undefined)
    replyToEl.current.parentElement.classList.add("hidden")

  }
  const uploadComment = (e) => {
    e.preventDefault()
    dispatch(addComment(comment,post[0]._id,replyCommentId)).then((data)=>{
      dispatch(organizeComments(data))
    })
    removeReplyBox()
    setComment("")
  }
  const showReplies = (e) => {
    console.log(e)
    if(e.target.nodeName === "BUTTON"){
      e.target.nextElementSibling.classList.toggle("hidden")
    } else {
      e.target.parentElement.nextElementSibling.classList.toggle("hidden")
    }
  }
  const commentIconClick = () => {
    inputEl.current.focus()
  }
  return (
    <>
    {showLikeElem && post && currentUser && post[0].like.length !== 0 && <UserDialog title="Likes" 
    hideElem={setShowLikeElem} data={post[0].like} 
    data2={currentUser.followings} followAction={followAction} 
    crUsername={currentUser.username}/>}

    <div className="lg:container mx-auto lg:px-3 md:px-2 ">
      <div className="flex flex-col md:flex-row border md:my-7 shadow-md h-[80vh]">
        <img src="/walk.jpg" alt="" className="w-full md:w-[65%] " />
        <div className="flex flex-col bg-white w-full md:w-[35%] ">
          <div className="flex py-5 px-4 border-b">
            <img src="/default.jpg" alt="" className="w-8 h-8 " />
            <div className="grid ml-4 -mt-1">
              <span className="text-sm">{(post &&  post[0].user.username) || <Skeleton />}</span>
              <span className="text-xs text-gray-500">Narela City (Delhi)</span>
            </div>
            <i className="fas fa-ellipsis-h text-gray-500 float-right ml-auto my-auto"></i>
          </div>
          <div className="flex border-b h-full overflow-auto flex-col p-4 space-y-5">
          <div className="flex space-x-3">
            <img src="/default.jpg" alt="" className="w-8 h-8 " />
            <p><span className="font-semibold text-gray-700" >{(post && post[0].user.username) || <Skeleton width={"100px"}/>}  </span> {post && post[0].caption}</p>
          </div>
            {post ? post[0].comments.length !== 0 && post[0].comments.map((comment)=>{
              return (
                <div className="flex space-x-3" key={comment._id}>
            <img src="/default.jpg" alt="" className="w-8 h-8 " />
            <div className="flex flex-col space-y-2">
               <div>
                <Link className="font-semibold text-gray-700" to={`/profile/${comment.user.username}`} >{comment.user.username} </Link>
               <span>{comment.comment}</span>
               </div> 
               <div className="flex space-x-4 text-sm text-gray-500">
              <span>2w</span>
              <button onClick={()=>replyComment(comment._id,comment.user.username)}>Reply</button>
            </div>
            {comment.childComments.length!==0 && 
            <button className="flex  items-center text-[#8e8e8e] space-x-4 ml-1 text-sm font-semibold" onClick={showReplies}>
              <div className="border-b border-b-[#8e8e8e] w-6"></div>
              <span className="">View replies ({comment.childComments.length}) </span>
            </button>
            }
            <div className="hidden">
            {comment.childComments.map((item)=>{
              return (
                <div className="flex space-x-3 mt-3" key={item._id}>
            <img src="/default.jpg" alt="" className="w-8 h-8 " />
            <div className="flex flex-col space-y-2">
               <div>
                <Link className="font-semibold text-gray-700" to={`/profile/${item.user.username}`} >{item.user.username} </Link>
               <span>{item.comment}</span>
               </div> 
               <div className="flex space-x-4 text-sm text-gray-500">
              <span>2w</span>
            </div>
            </div></div>
              )
            })}
            </div>
            </div>
            </div>
              )  
            }):<div style={{"borderTopColor":"transparent"}}
            className="m-auto w-16 h-16 border-4 border-gray-400 border-solid rounded-full animate-spin"></div>}  
          </div>
          <div className="flex flex-col p-3 space-y-2">
          <div className="w-full ">
              <div className="flex space-x-3 float-left">
              <i className={`${post && post[0].like.length !== 0 && currentUser && post[0].like.findIndex(({_id})=> _id === currentUser._id) !== -1 ? "fas text-red-500" : "far"} fa-heart text-2xl cursor-pointer`} onClick={likePosts}></i>
                <i className="far fa-comment text-2xl cursor-pointer" onClick={commentIconClick}></i>
                <i className="far fa-paper-plane text-2xl cursor-pointer"></i>
              </div>
              <i className="far fa-bookmark text-2xl cursor-pointer float-right"></i>
                
          </div>
          {post ? <p className="font-thin">
          Liked by <button className="font-semibold" onClick={showElem}>{post[0].like.length} users</button>
            </p>:<Skeleton count={0.5}/>}
            <p className="text-gray-400 text-xs font-extralight">APRIL 29</p>
            </div>
            <form action="" method="post" onSubmit={uploadComment}>
          <div className="flex pb-3 flex-col  relative space-y-2">
            <div className="flex absolute bg-white border-t w-full -top-9 pt-2 px-3 rounded-sm  items-center space-x-3 hidden">
            {<p className="w-full text-gray-500" ref={replyToEl}></p>}
              <i className="fas fa-times text-lg cursor-pointer" onClick={removeReplyBox}></i>
            </div>
            <div className="flex justify-between mx-2 py-3 px-4 border rounded-3xl">
            <input
              type="text"
              placeholder="Add a Comment..."
              className="w-full outline-none px-1"
              name="com"
              onChange={InputHandle}
              ref={inputEl}
              value={comment}
            />
            <button className="outline-none disabled:text-blue-400 text-blue-900 hover:text-blue-700" disabled={comment.trim().length === 0}>
              Post
            </button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default Post;
