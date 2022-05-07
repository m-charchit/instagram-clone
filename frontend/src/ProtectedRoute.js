import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // @ts-ignore
    const {isLoggedIn} = useSelector((state)=>state.auth)

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute