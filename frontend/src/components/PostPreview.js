import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchComments } from '../state/Actions/comment'
import { likePost } from '../state/Actions/post'
import { followActions } from '../state/Actions/user'
import UserDialog from './UsersDialog'

function PostPreview({post}) {
  const {currentUser} = useSelector((state) => state.user)
  const {comments} = useSelector((state) => state.comment)
  const dispatch = useDispatch()
  const [showLikeElem, setShowLikeElem] = useState(false)
  useEffect(() => {
    dispatch(fetchComments(post._id))
  }, [dispatch])
  
  const likePosts = () => {
    dispatch(likePost(post._id))
  }
  const showElem = () => {
    setShowLikeElem(true)
  }
  const followAction = (type ,userId) => {
    dispatch(followActions(userId,type))
    
  }
  return (
    <>
    {showLikeElem && post.like.length !== 0 && <UserDialog title="Likes" 
    hideElem={setShowLikeElem} data={post&& post.like} 
    data2={currentUser&& currentUser.followings} followAction={followAction} 
    crUsername={currentUser.username}/>}

    <div className="bg-white border">
          <div className="flex py-5 px-4 ">
            <img src="/default.jpg" alt="" className="w-8 h-8 " />
            <div className="grid ml-4 -mt-1">
              <span className="text-sm">{post.user.username}</span>
              <span className="text-xs text-gray-500">Narela City (Delhi)</span>
            </div>
            <i className="fas fa-ellipsis-h text-gray-500 float-right ml-auto my-auto"></i>
          </div>
          <img src="/walk.jpg" alt="" />
          <div className="flex flex-col py-3 px-4">
            <div className="w-full">
              <div className="flex space-x-3 float-left">
                <i className={`${post.like.length !== 0 && currentUser && post.like.findIndex(({_id})=> _id === currentUser._id) !== -1 ? "fas text-red-500" : "far"} fa-heart text-2xl cursor-pointer`} onClick={likePosts}></i>
                
                <Link  to={`/post/${post._id}`}><i className="far fa-comment text-2xl cursor-pointer"></i></Link>
                <i className="far fa-paper-plane text-2xl cursor-pointer"></i>
              </div>
              <i className="far fa-bookmark text-2xl cursor-pointer float-right"></i>
            </div>
            <p className="font-thin">
              Liked by <button className="font-semibold" onClick={showElem}>{post.like.length} users</button>
            </p>
            <p className="text-gray-600">
              <b>{post.user.username}</b> {post.caption}
            </p>
            <Link to={`/post/${post._id}`} className="outline-none text-gray-500 text-left text-sm w-fit active:text-gray-300 ">
              View all 4 comments
            </Link>
            <p>
              <a className="font-semibold">max0_s</a> Good
            </p>
            <p>
              <a className="font-semibold">{post.user.username}</a> Thanks
            </p>
          </div>
          <div className="flex border-t p-3 justify-between">
            <input
              type="text"
              placeholder="Add a Comment..."
              className="w-full outline-none px-1"
            />
            <button className="outline-none text-blue-400 hover:text-blue-700">
              Post
            </button>
          </div>
        </div>
        </>
  )
}

export default PostPreview