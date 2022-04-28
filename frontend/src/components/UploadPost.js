import React from "react";

function UploadPost() {
  return (
    <div className="md:container mx-auto lg:px-60 md:px-20 py-5">
      <div className="flex flex-col space-y-5 ">
        <img src="walk.jpg" alt="" className="w-full h-1/2" />
        <div className="flex flex-col">
          <label htmlFor="captionInput">Caption</label>
          <input
            type="text"
            id="captionInput"
            className="outline-none border-b-2 focus:border-black bg-inherit"
          />
        </div>
        <button className="py-2 px-3 bg-cyan-500 text-white text-sm font-semibold rounded-md shadow-lg shadow-cyan-500/50 focus:outline-none w-1/3 self-center">Upload</button>
      </div>
    </div>
  );
}

export default UploadPost;
