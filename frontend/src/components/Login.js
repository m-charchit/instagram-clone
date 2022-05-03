import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../state/Actions/auth";

function Login() {
  const [cred,setCred] = useState({username:"",password:""})  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(cred.username,cred.password))
    // @ts-ignore
    .then(()=>{
      navigate("/")
    })
    .catch(()=>{
      alert("Error")
    })
  }
  const InputChange = (e) => {
    setCred({...cred,[e.target.name]:e.target.value})
  }
  return (
    <div className="flex items-center justify-center flex-col space-y-1">
      <div className="flex flex-col px-12 py-14 border bg-white my-7 space-y-5 items-center">
        <img src="igNavbarLogo.png" alt="" className="w-40" />
        <form action="" method="post" onSubmit={loginHandler}>
        <div className="flex flex-col">
          <input
            type="text"
            className="outline-none px-2 py-2 w-72 border bg-gray-100 bg-opacity-25 focus:border-gray-400 text-sm mb-2"
            placeholder="Username"
            name="username"
            onChange={InputChange}
          />
          <input
            type="text"
            className="outline-none px-2 py-2 w-72 border bg-gray-100 bg-opacity-25 focus:border-gray-400 text-sm mb-4"
            placeholder="Password"
            name="password"
            onChange={InputChange}
          />
          <button className="outline-none text-white font-semibold  bg-blue-500 py-1 rounded-md active:bg-blue-300">
            Log In
          </button>
        </div>
        </form>
        <Link to="" className="text-sm text-cyan-700">
          Forgot password?
        </Link>
      </div>
      <div className="flex px-20 py-5 border bg-white items-center">
        <span>
          Don't have an account?{" "}
          <Link to="register" className="font-semibold text-blue-400">
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
