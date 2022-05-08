/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchUserPosts } from "../state/Actions/post";
import { followActions, getUser } from "../state/Actions/user";
import NotFound from "./NotFound";

function Profile() {
  const {username} = useParams()
  const dispatch = useDispatch()
  // @ts-ignore
  const { user } = useSelector((state) => state.user);
  // @ts-ignore
  const { currentUser } = useSelector((state) => state.user);
  const isUser = currentUser && user && user.username === currentUser.username

  // @ts-ignore
  const { posts } = useSelector((state) => state.post)

  useEffect(() => {
    dispatch(getUser(username))
    dispatch(fetchUserPosts(username))
  }, [dispatch,username])

  const followAction = (type) => {
    dispatch(followActions(user._id,type))
  }

  
  if (user === null){
    return <NotFound/>
  } else if (user) {
  return (
    <div className="lg:w-8/12 lg:mx-auto mb-8 mt-3 md:mt-8">
      <header className="md:w-3/12 md:ml-16">
        <div className="flex">
          <img
            src="/default.jpg"
            className="w-24 h-24 md:w-44 md:h-44 rounded-full border-2 border-pink-600 ml-3"
            alt=""
          />
          <div className="ml-7 md:ml-24">
            <div className="flex mt-3 md:mt-4  relative flex-col md:flex-row">  
              <div className="flex">
                <span className="text-3xl font-thin mr-2">{user && user.username}</span>
                <i className={`fas fa-ellipsis-h text-lg  md:absolute -right-8 mt-1 ${isUser ? "hidden" : ""}`}></i>
              </div>
              <div className="flex space-x-3 mt-4 md:mt-0 items-center">
                {isUser ? <Link
                  to={"/profile/edit"}
                  className="font-semibold text-sm py-1 md:ml-3 px-8 md:px-2 border border-gray-600 rounded text-center"
                >Edit Profile</Link> : <><a
                href="#?"
                className="font-semibold text-sm py-1 md:ml-3 px-8 md:px-2 border border-gray-600 rounded text-center"
              >
                Message
              </a>
              <button className="bg-blue-600 font-semibold text-white px-5 py-1 rounded " onClick={()=>followAction("follow")}>
                Follow
              </button>
              <button className="bg-blue-500 px-4 py-1 rounded" onClick={()=>followAction("unfollow")}>
                <i className="fas fa-user-check"></i>
              </button>
              </>}
              </div>
            </div>
            <div className="md:flex mt-7 hidden">
              <span className="mr-7 flex">
                <b className="font-semibold mr-1">{posts && posts.length}</b> posts
              </span>
              <span className="mr-7 flex">
                <b className="font-semibold mr-1">{ user && user.followersCount}</b> followers
              </span>
              <span className="flex">
                <b className="font-semibold mr-1">{user && user.followingsCount}</b> following
              </span>
            </div>
          </div>
        </div>
        <div className="w-max mt-5 pl-5 md:pl-7 md:-mt-14 md:ml-64 grid gap-y-2">
          <span className="font-semibold md:text-lg">{user && user.name}</span>
          {user && user.followersCount !== 1 && 
          <span className="text-sm text-gray-500">
            Followed by <a className="font-bold"></a>,
            <a className="font-bold"></a> + more
          </span>
          }
        </div>
        <div className="md:hidden mt-7 flex justify-around text-sm text-center border-t py-3">
          <span className="text-gray-600 w-1/3 ">
            <b className="font-semibold">{posts && posts.length}</b>
            <br /> posts
          </span>
          <span className="text-gray-600 w-1/3">
            <b className="font-semibold">{user && user.followersCount}</b>
            <br /> followers
          </span>
          <span className="text-gray-600 w-1/3">
            <b className="font-semibold ">{user && user.followingsCount}</b> <br /> following
          </span>
        </div>
      </header>
      <div className="border-t md:mt-14">
        <div className="flex justify-around text-2xl">
          <a
            href=""
            className="py-2 md:p-3 md:border-t border-black md:text-sm "
          >
            <i className="fas fa-th"></i>{" "}
            <span className="hidden md:inline">POSTS</span>
          </a>
        </div>
        <div className="flex flex-wrap ">
          {posts && posts.map((post) => {
            return (
              <div className="w-1/3 p-px md:px-3 md:pb-6 group cursor-pointer" key={post._id}>
              <div className="relative pb-full" style={{ paddingBottom: "100%" }}>
                <img
                  src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  className="w-full h-full object-cover absolute group-hover:brightness-75"
                  alt=""
                  />
                <div className="w-full h-full absolute flex justify-center items-center space-x-7">
                  <span className="font-semibold text-white"><i className="fas fa-heart text-xl text-white align-middle"></i> {post.like.length}</span>
                  <span className="font-semibold text-white"><i className="fas fa-comment text-xl text-white align-middle"></i> 2390</span>
                </div>
              </div>
            </div>
            )
              })
              }
        </div>
      </div>
    </div>
  );
            }
}

export default Profile;
