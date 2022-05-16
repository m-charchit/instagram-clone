import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likePost } from '../state/Actions/post'

function PostPreview({post}) {
  const {currentUser} = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const likePosts = () => {
    dispatch(likePost(post._id))
  }
  return (
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
                <i className={`${post.like.includes(currentUser._id) ? "fas text-red-500" : "far"} fa-heart text-2xl cursor-pointer`} onClick={likePosts}></i>
                <i className="far fa-comment text-2xl cursor-pointer"></i>
                <i className="far fa-paper-plane text-2xl cursor-pointer"></i>
              </div>
              <i className="far fa-bookmark text-2xl cursor-pointer float-right"></i>
            </div>
            <p className="font-thin">
              Liked by <a className="font-semibold">{post.like.length} users</a>
            </p>
            <p className="text-gray-600">
              <b>{post.user.username}</b> {post.caption}
            </p>
            <button className="outline-none text-gray-500 text-left text-sm w-fit active:text-gray-300 ">
              View all 4 comments
            </button>
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
  )
}

export default PostPreview