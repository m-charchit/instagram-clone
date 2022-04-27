/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function Navbar() {
  return (
    <nav className="border-b px-4 py-3 bg-white">
      <div className="flex items-center md:justify-evenly justify-between">
        <img src="/igNavbarLogo.png"  alt="" />
        <div className="relative hidden md:block">
          <input
            type="text"
            className="bg-gray-100 outline-none px-9 py-1 rounded-md"
            placeholder="Search"
          />
          <i
            className="fa fa-search text-gray-400 absolute left-0 pt-2 pl-3"
            aria-hidden="true"
          ></i>
        </div>
        <div className="flex items-center">
          <i className="fas fa-home text-2xl mx-2"></i>
          <i className="fas fa-comment-dots text-2xl mx-2"></i>
          <i className="fas fa-compass text-2xl mx-2"></i>
          <img
            src="/default.jpg"
            className="mx-2"
            alt=""
            width="25px"
            height="25px"
          />
          {/* <a className="bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded bg-opacity-90 md:mr-2" href="#">Log In</a>
          <a className="px-2 py-1 text-blue-500 font-semibold text-sm rounded bg-opacity-90 ml-2" href="#">Sign Up</a> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
