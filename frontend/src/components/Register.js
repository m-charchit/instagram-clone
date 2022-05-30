import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../state/Actions/auth";
import {Link, useNavigate} from "react-router-dom";

function Register() {
  const [cred,setCred] = useState({username:"",email:"",name:"",password:""})
  const navigate = useNavigate();
  const InputChange = (e) => {
    setCred({...cred, [e.target.name]: e.target.value})
  }
  const dispatch = useDispatch();
  const handleRegister = (e) => {
      e.preventDefault()
      dispatch(register(cred.username,cred.email,cred.name,cred.password))
      // @ts-ignore
      .then(() => {
        navigate("/")
      })
      .catch(()=>{
        alert("error")
      })
  }

  return (
    <div className="flex items-center justify-center flex-col space-y-1">
      <div className="flex flex-col px-6 md:px-10 py-14 border bg-white my-7 space-y-5 items-center">
        <img src="igNavbarLogo.png" alt="" className="w-40" />
          <form action="" method="post" onSubmit={handleRegister}>
        <div className="flex flex-col">
          <input
            type="text"
            className="outline-none px-2 py-2 w-60 md:w-72 border bg-gray-100 bg-opacity-25 focus:border-gray-400 text-sm mb-2"
            placeholder="Username"
            name="username"
            onChange={InputChange}
          />
          <input
            type="text"
            className="outline-none px-2 py-2 w-60 md:w-72 border bg-gray-100 bg-opacity-25 focus:border-gray-400 text-sm mb-2"
            placeholder="Name"
            name="name"
            onChange={InputChange}
          />
          <input
            type="text"
            className="outline-none px-2 py-2 w-60 md:w-72 border bg-gray-100 bg-opacity-25 focus:border-gray-400 text-sm mb-2"
            placeholder="Email"
            name="email"
            onChange={InputChange}
          />
          <input
            type="password"
            className="outline-none px-2 py-2 w-60 md:w-72 border bg-gray-100 bg-opacity-25 focus:border-gray-400 text-sm mb-2"
            placeholder="Password"
            name="password"
            onChange={InputChange}
          />
          {/* <input
            type="password"
            className="outline-none px-2 py-2 w-72 border bg-gray-100 bg-opacity-25 focus:border-gray-400 text-sm mb-4"
            placeholder="Confirm Password"
          /> */}
          <button className="outline-none text-white font-semibold  bg-blue-500 py-1 rounded-md active:bg-blue-300" >
            Sign Up
          </button>
        </div>
          </form>
      </div>
      <div className="flex px-14 md:px-24 py-5 border bg-white items-center">
        <span>
          Have an account ?{" "}
          <Link to="/login" className="font-semibold text-blue-400">
            Log In
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
