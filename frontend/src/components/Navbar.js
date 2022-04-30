/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="border-b px-4 py-3 bg-white">
      <div className="flex items-center md:justify-evenly justify-between">
        <img src="/igNavbarLogo.png" alt="" />
        <div className="relative hidden md:block">
          <input
            type="text"
            className="bg-gray-100 outline-none px-9 py-1 rounded-md peer"
            placeholder="Search"
          />
          <i
            className="fa fa-search text-gray-400 absolute left-0 pt-2 pl-3"
            aria-hidden="true"
          ></i>

          <div className="absolute w-80 h-80 py-2 hidden justify-center peer-focus:flex bg-white shadow-md top-11 rounded-md border border-gray-300">
            <div className="w-9 overflow-hidden inline-block absolute -top-4">
              <div className=" h-4 w-4 bg-white rotate-45 transform origin-bottom-left border-gray-300 border"></div>
            </div>
            <div className="w-full flex-col flex overflow-auto overflow-x-hidden whitespace-nowrap">
              <div className="flex px-3 py-2 space-x-3 hover:bg-gray-100 cursor-pointer ">
              <img src="/default.jpg" alt="" className="w-12 h-12 rounded-full"/>
              <div>
                <p className="font-semibold">makemytrip</p>
                <p className="text-sm text-slate-500">Make My  trips</p>
              </div>
              </div>
              <div className="flex px-3 py-2 space-x-3 hover:bg-gray-100 cursor-pointer ">
              <img src="/default.jpg" alt="" className="w-12 h-12 rounded-full"/>
              <div>
                <p className="font-semibold">makemytrip</p>
                <p className="text-sm text-slate-500">Make my trips</p>
              </div>
              </div>
              <div className="flex px-3 py-2 space-x-3 hover:bg-gray-100 cursor-pointer ">
              <img src="/default.jpg" alt="" className="w-12 h-12 rounded-full"/>
              <div>
                <p className="font-semibold">makemytrip</p>
                <p className="text-sm text-slate-500">Make my trips</p>
              </div>
              </div>
              <div className="flex px-3 py-2 space-x-3 hover:bg-gray-100 cursor-pointer ">
              <img src="/default.jpg" alt="" className="w-12 h-12 rounded-full"/>
              <div>
                <p className="font-semibold">makemytrip</p>
                <p className="text-sm text-slate-500">Make my trips</p>
              </div>
              </div>
              <div className="flex px-3 py-2 space-x-3 hover:bg-gray-100 cursor-pointer ">
              <img src="/default.jpg" alt="" className="w-12 h-12 rounded-full"/>
              <div>
                <p className="font-semibold">makemytrip</p>
                <p className="text-sm text-slate-500">Make my trips</p>
              </div>
              </div>
              <div className="flex px-3 py-2 space-x-3 hover:bg-gray-100 cursor-pointer ">
              <img src="/default.jpg" alt="" className="w-12 h-12 rounded-full"/>
              <div>
                <p className="font-semibold">makemytrip</p>
                <p className="text-sm text-slate-500">Make my trips</p>
              </div>
              </div>
            </div>
            <span className="text-gray-500 hidden">Search for someone</span>
          </div>
        </div>
        <div className="flex items-center">
          <Link to="/">
            <i className="fas fa-home text-2xl mx-2"></i>
          </Link>
          <Link to="">
            <i className="fas fa-comment-dots text-2xl mx-2"></i>
          </Link>
          <Link to="">
            <i className="fas fa-compass text-2xl mx-2"></i>
          </Link>
          <div className="dropdown">
            <a href="#" className="peer cursor-pointer">
              <img
                src="/default.jpg"
                className="mx-2 "
                alt=""
                width="25px"
                height="25px"
              />
            </a>

            <ul className="dropdown-menu shadow-md hover:block absolute right-10 hidden bg-white pt-1 w-52 peer-focus:block">
              <li className="">
                <Link
                  to="profile/charchit.dahiya"
                  className="rounded-t hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap"
                >
                  <i className="fa fa-user-circle mr-2"></i> Profile
                </Link>
              </li>
              <li className="">
                <Link
                  to="profile/edit"
                  className=" hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap"
                >
                  <i className="fas fa-cog mr-2"></i> Settings
                </Link>
              </li>
              <hr />
              <li className="">
                <a
                  className="rounded-b  hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap"
                  href="#"
                >
                  Log Out
                </a>
              </li>
            </ul>
          </div>
          {/* <Link to="/login" className="bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded bg-opacity-90 md:mr-2" >Log In</Link>
          <Link to="/register" className="px-2 py-1 text-blue-500 font-semibold text-sm rounded bg-opacity-90 ml-2" >Sign Up</Link> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
