import React from 'react';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Home from "./components/Home"
import UploadPost from './components/UploadPost';
import EditProfile from './components/EditProfile';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from "./components/NotFound";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route index element={<Home/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='profile' >
      <Route path=':username' element={<Profile/>}/>
      <Route path='edit' element={<EditProfile/>}/>
      </Route>
      <Route path='upload' element={<UploadPost/>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}

export default App;
