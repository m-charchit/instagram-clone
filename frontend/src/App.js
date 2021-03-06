import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Home from "./components/Home";
import UploadPost from "./components/UploadPost";
import EditProfile from "./components/EditProfile";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import {  Route , useLocation } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./state/Actions/user";
import CustomSwitch from "./components/CustomSwitch";
import Post from "./components/Post";
import Footer from "./components/Footer"
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  const location = useLocation()
  return (
    <>
      <Navbar />
      <CustomSwitch>
        <Route element={<ProtectedRoute />}>
          <Route index element={<Home />} />
        </Route>
        <Route element={<ProtectedRoute logRegPage={true} />}>
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute logRegPage={true} />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="profile">
          <Route path=":username" element={<Profile />} />
          <Route element={<ProtectedRoute />}>
            <Route path="edit" element={<EditProfile />} />
          </Route>
          <Route path="" element={<NotFound />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="upload" element={<UploadPost />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/post/:postId" element={<Post />}>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </CustomSwitch>
      {location.pathname.startsWith("/post/") === false && <Footer/>}
    </>
  );
}

export default App;
