import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = (props) => {

    // @ts-ignore
    const {isLoggedIn} = useSelector((state)=>state.auth)
    if (!props.logRegPage){
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
    } else if(props.logRegPage === true) {
        return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
    }
}

export default ProtectedRoute