import React from "react";

function Post() {
  return (
    <div className="md:container mx-auto xl:px-24 lg:px-12">
      <div className="flex flex-col md:flex-row border md:my-8 h-full shadow-md">
        <img src="/walk.jpg" alt="" className="w-full md:w-2/3 " />
        <div className="flex flex-col bg-white  md:w-96">
          <div className="flex py-5 px-4 border-b">
            <img src="/default.jpg" alt="" className="w-8 h-8 " />
            <div className="grid ml-4 -mt-1">
              <span className="text-sm">charchit.dahiya</span>
              <span className="text-xs text-gray-500">Narela City (Delhi)</span>
            </div>
            <i className="fas fa-ellipsis-h text-gray-500 float-right ml-auto my-auto"></i>
          </div>
          <div className="flex border-b h-64 overflow-auto flex-col p-4 space-y-5">
          <div className="flex space-x-3">
            <img src="/default.jpg" alt="" className="w-8 h-8 " />
            <p><span className="font-semibold text-gray-700" >charchit.dahiya </span> Nothing is everything</p>
          </div>
          <div className="flex space-x-3">
            <img src="/default.jpg" alt="" className="w-8 h-8 " />
            <div className="flex flex-col space-y-2">
            <p><span className="font-semibold text-gray-700" >charchit.dahiya </span> brooo❤️❤️</p>
            <div className="flex space-x-4 text-sm text-gray-500">
              <span>2w</span>
              <button>Reply</button>
            </div>
            </div>
          </div>
          </div>
          <div className="flex flex-col p-3 space-y-3">
          <div className="w-full ">
              <div className="flex space-x-3 float-left">
                <i className="far fa-heart text-2xl cursor-pointer"></i>
                <i className="far fa-comment text-2xl cursor-pointer"></i>
                <i className="far fa-paper-plane text-2xl cursor-pointer"></i>
              </div>
              <i className="far fa-bookmark text-2xl cursor-pointer float-right"></i>
                
          </div>
          <p className="font-thin">
              Liked by <a className="font-semibold">aksh_tyagi</a> and{" "}
              <a className="font-semibold">73 others</a>
            </p>
            <p className="text-gray-400 text-xs font-extralight">APRIL 29</p>
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
      </div>
    </div>
  );
}

export default Post;
