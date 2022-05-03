import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";

function Home() {
  return (
    <div className="md:container mx-auto lg:px-60 md:px-20">
      <div className="bg-white flex space-x-4 p-5 border md:mt-7 overflow-auto">
        <div className="text-center">
          <img
            src="/default.jpg"
            className="mb-1 w-16 h-16 rounded-full border-2 border-pink-600"
            alt=""
          />
          <span className="text-sm">charchit.da...</span>
        </div>
        <div className="text-center">
          <img
            src="/default.jpg"
            className="mb-1 w-16 h-16 rounded-full border-2 border-pink-600"
            alt=""
          />
          <span className="text-sm">charchit.da...</span>
        </div>
        <div className="text-center">
          <img
            src="/default.jpg"
            className="mb-1 w-16 h-16 rounded-full border-2 border-pink-600"
            alt=""
          />
          <span className="text-sm">charchit.da...</span>
        </div>
        <div className="text-center">
          <img
            src="/default.jpg"
            className="mb-1 w-16 h-16 rounded-full border-2 border-pink-600"
            alt=""
          />
          <span className="text-sm">charchit.da...</span>
        </div>
      </div>
      <div className="flex flex-col space-y-6 my-6 ">
        <Post/>
      </div>
    </div>
  );
}

export default Home;
