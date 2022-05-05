/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts } from "../state/Actions/post";
import { getCurrentUser } from "../state/Actions/user";

function Profile() {
  const dispatch = useDispatch()
  // @ts-ignore
  const { user } = useSelector((state) => state.user);
  // @ts-ignore
  const { posts } = useSelector((state) => state.post)

  useEffect(() => {
    
    // @ts-ignore
    dispatch(getCurrentUser())
    // @ts-ignore
    dispatch(fetchUserPosts())
  }, [])
  
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
                <i className="fas fa-ellipsis-h text-lg  md:absolute -right-4 mt-1"></i>
              </div>
              <div className="flex space-x-3 mt-4 md:mt-0 items-center">
                <a
                  href="#?"
                  className="font-semibold text-sm py-1 md:ml-3 px-8 md:px-2 border border-gray-600 rounded text-center"
                >
                  Message
                </a>
                <button className="bg-blue-500 px-3 py-1 rounded ">
                  <i className="fas fa-user-check"></i>
                </button>
              </div>
            </div>
            <div className="md:flex mt-7 hidden">
              <span className="mr-7 flex">
                <b className="font-semibold mr-1">{posts && posts.length}</b> posts
              </span>
              <span className="mr-7 flex">
                <b className="font-semibold mr-1">{ user && user.followers.length}</b> followers
              </span>
              <span className="flex">
                <b className="font-semibold mr-1">{user && user.followings.length}</b> following
              </span>
            </div>
          </div>
        </div>
        <div className="w-max mt-5 pl-5 md:pl-7 md:-mt-14 md:ml-64 grid gap-y-2">
          <span className="font-semibold md:text-lg">Charchit</span>
          <span className="text-sm text-gray-500">
            Followed by <a className="font-bold">arayan</a>,{" "}
            <a className="font-bold">ikansh</a> +10 more
          </span>
        </div>
        <div className="md:hidden mt-7 flex justify-around text-sm text-center border-t py-3">
          <span className="text-gray-600 w-1/3 ">
            <b className="font-semibold">{posts && posts.length}</b>
            <br /> posts
          </span>
          <span className="text-gray-600 w-1/3">
            <b className="font-semibold">{user && user.followers.length}</b>
            <br /> followers
          </span>
          <span className="text-gray-600 w-1/3">
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
        <div className="flex flex-wrap ">
          <div className="w-1/3 p-px md:px-3 md:pb-6">
            <div className="relative pb-full" style={{ paddingBottom: "100%" }}>
              <img
                src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                className="w-full h-full object-cover absolute "
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
