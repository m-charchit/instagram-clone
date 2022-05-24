/* eslint-disable jsx-a11y/anchor-is-valid */
// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchUserPosts } from "../state/Actions/post";
import { checkFollow, followActions, getUser } from "../state/Actions/user";
import UserDialog from "./UsersDialog";
import NotFound from "./NotFound";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

function Profile() {
  const {username} = useParams()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.user);
  const isUser = currentUser && user && user.username === currentUser.username

  const [showFollowerElem, setShowFollowerElem] = useState(false)
  const [showFollowingElem, setShowFollowingElem] = useState(false)
  const { userPosts } = useSelector((state) => state.post)

  useEffect(() => {
    dispatch(getUser(username))
    .then((user)=>{
      dispatch(checkFollow(user._id))
      
      !userPosts && dispatch(fetchUserPosts(user._id,1))
    })
    setShowFollowerElem(false)
    setShowFollowingElem(false)
  }, [dispatch,username])

  const followAction = (type ,userId=user._id) => {
    dispatch(followActions(userId,type,user._id)).then(()=>{
      dispatch(checkFollow(user._id))
    })
    
  }

  const showFollowers = () => {
    setShowFollowerElem(true)
  }
  const showFollowings = () => {
    setShowFollowingElem(true)
  }
  
  if (user === null){
    return <NotFound/>
  } else if (user) {
  return (
    <>    
    {showFollowerElem && user.followers.length !== 0 && <UserDialog title="Followers" hideElem={setShowFollowerElem} data={user&& user.followers} data2={currentUser&& currentUser.followings} followAction={followAction} crUsername={currentUser.username}/>}
    {showFollowingElem && user.followings.length !== 0 && <UserDialog title="Followings" hideElem={setShowFollowingElem} data={user&& user.followings} data2={currentUser&& currentUser.followings} followAction={followAction} crUsername={currentUser.username}/>}
    <div className="lg:w-8/12 lg:mx-auto mb-8 mt-3 md:mt-8 ">
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
              {user && user.followingUser ?
              <button className="bg-blue-500 px-4 py-1 rounded" onClick={()=>followAction("unfollow")}>
                <i className="fas fa-user-check"></i>
              </button>:
              <button className="bg-blue-600 font-semibold text-white px-5 py-1 rounded " onClick={()=>followAction("follow")}>
                Follow
              </button>}
              </>}
              </div>
            </div>
            <div className="md:flex mt-7 hidden">
              <span className="mr-7 flex">
                <b className="font-semibold mr-1">{userPosts && userPosts.length}</b> posts
              </span>
              <span className="mr-7 flex cursor-pointer" onClick={showFollowers}>
                <b className="font-semibold mr-1">{ user && user.followers.length}</b> followers
              </span>
              <span className="flex cursor-pointer" onClick={showFollowings}>
                <b className="font-semibold mr-1">{user && user.followings.length}</b> following
              </span>
            </div>
          </div>
        </div>
        <div className="w-max mt-5 pl-5 md:pl-7 md:-mt-14 md:ml-64 grid gap-y-2">
          <span className="font-semibold md:text-lg">{user && user.name}</span>
        </div>
        <div className="md:hidden mt-7 flex justify-around text-sm text-center border-t py-3">
          <span className="text-gray-600 w-1/3 ">
            <b className="font-semibold">{userPosts && userPosts.length}</b>
            <br /> posts
          </span>
          <span className="text-gray-600 w-1/3" onClick={showFollowers}>
            <b className="font-semibold">{user && user.followers.length}</b>
            <br /> followers
          </span>
          <span className="text-gray-600 w-1/3" onClick={showFollowings}>
            <b className="font-semibold ">{user && user.followings.length}</b> <br /> following
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
        {userPosts && currentUser && <InfiniteScroll scrollThreshold={"10px"} style={{"overflowY":"hidden"}} dataLength={userPosts.totalDocs} next={()=>{dispatch(fetchUserPosts(currentUser._id,userPosts.nextPage)).then(()=>{});}} hasMore={userPosts.hasNextPage}>
        <div className="flex flex-wrap ">
          {userPosts.docs.map((post) => {
            return (
              <div className="w-1/3 p-px md:px-3 md:pb-6 group cursor-pointer" key={post._id}>
                <Link to={`/post/${post._id}`}>
              <div className="relative pb-full" style={{ paddingBottom: "100%" }}>
                <img
                  src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  className="w-full h-full object-cover absolute group-hover:brightness-75"
                  alt=""
                  />
                <div className="w-full h-full absolute  justify-center items-center space-x-7 hidden md:flex">
                  <span className="font-semibold text-white"><i className="fas fa-heart text-xl text-white align-middle"></i> {post.like.length}</span>
                  <span className="font-semibold text-white"><i className="fas fa-comment text-xl text-white align-middle"></i> {post.comments.length}</span>
                </div>
              </div>
            </Link>
            </div>
            )
              })
              }
        </div>
        </InfiniteScroll>}
      </div>
    </div>
    </>
  );
            }
}

export default Profile;