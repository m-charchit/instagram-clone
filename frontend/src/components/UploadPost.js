import React from "react";

function UploadPost() {
  return (
    <div className="md:container mx-auto lg:px-60 md:px-20 py-5">
      <div className="flex flex-col space-y-5 ">
        <input type="file" name="" id="picInput" className="hidden" />
        <label htmlFor="picInput">
          <div className="relative cursor-pointer hover:opacity-90 transition-all duration-300 group">
            <img
              src="walk.jpg"
              alt="Avatar"
              className="object-cover w-full h-full hidden"
            />
            <div className="w-full h-full text-9xl text-center border rounded-md p-10"><i className="fa fa-upload" aria-hidden="true"></i></div>
            <div className="absolute hidden w-full bottom-1/3 text-center text-transparent group-hover:text-gray-600 text-9xl transition-all duration-300">
              <i className="fa fa-upload" aria-hidden="true"></i>
            </div>
          </div>
        </label>
        <div className="flex flex-col">
          <label htmlFor="captionInput">Caption</label>
          <input
            type="text"
            id="captionInput"
            className="outline-none border-b-2 focus:border-black bg-inherit"
          />
        </div>
        <button className="py-2 px-3 bg-cyan-500 text-white text-sm font-semibold rounded-md shadow-lg shadow-cyan-500/50 focus:outline-none w-1/3 self-center">
          Upload
        </button>
      </div>
    </div>
  );
}

export default UploadPost;
