/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {logout} from "../state/Actions/auth"
import { getCurrentUser } from "../state/Actions/user";
import Spinner from "./Spinner";

function Navbar() {
  const dispatch = useDispatch()
  // @ts-ignore
  const { currentUser } = useSelector((state)=>state.user)
  const [userList, SetuserList] = useState([])
  const [progress, setProgress] = useState(false)
  const navigate =useNavigate()
  // @ts-ignore
  const {isLoggedIn} = useSelector((state)=>state.auth)
  const handleLogout = () => {
      dispatch(logout())
      dispatch(getCurrentUser())
      navigate("/login")
    }
  
    const handleInput = (e) => {
      console.log(e.target.value)
      if(e.target.value!==""){
        setProgress(true)
        axios.post("http://localhost:5000/api/user/searchUser",{search:e.target.value})
        .then((response)=>{
            setProgress(false)
            SetuserList(response.data)
            console.log(response.data)
        })
        .catch((error)=>{
          setProgress(false)
          alert("error")
        })
      } else {
        SetuserList([])
      }
    }

  return (
    <nav className="border-b px-4 py-3 bg-white">
      <div className="flex items-center md:justify-evenly justify-between">
        <Link to={"/"}><img src="/igNavbarLogo.png" alt="" /></Link>
        <div className="relative hidden md:block">
          <input
            type="text"
            className="bg-gray-100 outline-none px-9 py-1 rounded-md peer"
            placeholder="Search"
            onChange={handleInput}
          />
          <i
            className="fa fa-search text-gray-400 absolute left-0 pt-2 pl-3"
            aria-hidden="true"
          ></i>

          <div className="absolute z-20 w-80 h-80 py-2 flex invisible opacity-0 justify-center hover:visible peer-focus:visible peer-focus:opacity-100 bg-white shadow-md top-11 rounded-md border border-gray-300 transition-opacity duration-500">
            <div className="w-9 overflow-hidden inline-block absolute -top-4">
              <div className=" h-4 w-4 bg-white rotate-45 transform origin-bottom-left border-gray-300 border"></div>
            </div>
            <div className="w-full flex-col flex overflow-auto overflow-x-hidden whitespace-nowrap">
            {progress ?  <div className="m-auto"><Spinner/></div> : 
            userList.length !== 0 ? userList.map((user)=>{
              return (
                  <Link to={`/profile/${user.username}`} key={user._id}>
              <div className="flex px-3 py-2 space-x-3 hover:bg-gray-100 cursor-pointer ">
              <img src="/default.jpg" alt="" className="w-12 h-12 rounded-full"/>
              <div>
                <p className="font-semibold">{user.username}</p>
                <p className="text-sm text-slate-500">{user.name}</p>
              </div>
              </div>
            </Link>
              )
            }) : <p className="m-auto">No Results</p> 
          }
          </div>
            <span className="text-gray-500 hidden">Search for someone</span>
          </div>
        </div>
        <div className="flex items-center space-x-3 md:space-x-6">
          {isLoggedIn ?
          <>
          <Link to="/">
            <i className="fas fa-home text-2xl "></i>
          </Link>
          <Link to="">
            <i className="fas fa-comment-dots text-2xl "></i>
          </Link>
          <Link to="/upload">
            <i className="far fa-plus-square text-2xl "></i>
          </Link>
          <Link to="">
            <i className="fas fa-compass text-2xl "></i>
          </Link>
          <div className="dropdown">
            <button className="peer cursor-pointer align-middle">
              <img
                src="/default.jpg"
                className=" "
                alt=""
                width="25px"
                height="25px"
              />
            </button>

            <ul className="dropdown-menu z-10 shadow-md hover:visible absolute right-10 invisible opacity-0 bg-white pt-1 w-52  peer-focus:visible peer-focus:opacity-100 transition-opacity duration-700">
              <li className="">
                <Link
                  to={`profile/${currentUser && currentUser.username}`}
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
                <button
                  className="rounded-b  hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap w-full text-left"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div> 
          </>:
          <>
          <Link to="/login" className="bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded bg-opacity-90 md:mr-2" >Log In</Link>
          <Link to="/register" className="px-2 py-1 text-blue-500 font-semibold text-sm rounded bg-opacity-90 ml-2" >Sign Up</Link>
          </>
  }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
