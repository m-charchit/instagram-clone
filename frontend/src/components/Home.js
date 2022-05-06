import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import ProfileCard from "./ProfileCard";

function Home() {
  return (
    <div className="md:container mx-auto xl:px-44 lg:px-20  ">
      <div className="flex flex-col lg:flex-row ">
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
      
      <div className="flex-row lg:flex-col flex lg:mt-12 pl-4 w-1/3 ">
              <span className="hidden lg:block"><ProfileCard imgSize={16}/></span>
        {/* <p className="text-gray-400 font-semibold ml-4 mt-3">
          Suggestion For You
        </p> */}
        <ProfileCard imgSize={9}/>
        <ProfileCard imgSize={9}/>
        <ProfileCard imgSize={9}/>
            </div>
      </div>
      <div className="flex flex-col space-y-6 lg:w-2/3 lg:-mt-40">
        <Post/>
      </div>
      
    </div>
  );
}

export default Home;
