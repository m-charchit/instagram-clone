// @ts-nocheck
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../state/Actions/post";
import { getSuggestedUsers } from "../state/Actions/user";
import PostPreview from "./PostPreview";
import ProfileCard from "./ProfileCard";

function Home() {
  const dispatch = useDispatch()
  const {posts} = useSelector((state) => state.post)
  const {users,currentUser} = useSelector(state => state.user)
  
  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(getSuggestedUsers())
  }, [dispatch])
  
  return (
    <div className="md:container mx-auto xl:px-44 lg:px-20  space-y-6">
      <div className="flex flex-col lg:flex-row relative space-y-6">
      <div className="lg:w-2/3 bg-white flex space-x-4 px-5 py-3 border md:mt-7 overflow-auto h-fit">
        <div className="text-center">
          <img
            src="/default.jpg"
            className="mb-2 w-16 h-16 rounded-full border-2 border-pink-600"
            alt=""
          />
          <span className="text-sm">charchit.da...</span>
        </div>
        <div className="text-center">
          <img
            src="/default.jpg"
            className="mb-2 w-16 h-16 rounded-full border-2 border-pink-600"
            alt=""
          />
          <span className="text-sm">charchit.da...</span>
        </div>
        <div className="text-center">
          <img
            src="/default.jpg"
            className="mb-2 w-16 h-16 rounded-full border-2 border-pink-600"
            alt=""
          />
          <span className="text-sm">charchit.da...</span>
        </div>
        <div className="text-center">
          <img
            src="/default.jpg"
            className="mb-2 w-16 h-16 rounded-full border-2 border-pink-600"
            alt=""
          />
          <span className="text-sm">charchit.da...</span>
        </div>
      </div>
      
      <div className="flex-row lg:flex-col flex lg:mt-12 pl-5 lg:w-1/3 w-full  bg-white lg:bg-inherit border lg:border-0 py-10 lg:py-0 relative lg:absolute lg:right-0 space-x-2 overflow-auto">
              <span className="hidden lg:block"><ProfileCard user={currentUser}/></span>
        <p className="text-gray-400 font-semibold lg:ml-4 lg:my-3.5 absolute lg:relative top-1 ">
          Suggestion For You
        </p>
        {users && users.map((user)=>{
          return <ProfileCard user={user} key={user._id}/>
        })}
            </div>
      </div>
      <div className="flex flex-col space-y-6 lg:w-2/3 ">
      {posts && posts.length !== 0 ? posts.map((post)=>{
        return <PostPreview post={post} key={post._id}/>
      }) : <>
        <p className="text-center m-auto font-semibold text-3xl text-gray-600" >No Posts Available</p>
        <p className="text-center m-auto font-semibold text-gray-600">Users you have followed haven't posted yet. <br />Follow more people to see post</p>
        </>

      }
      </div>
      
    </div>
  );
}

export default Home;
