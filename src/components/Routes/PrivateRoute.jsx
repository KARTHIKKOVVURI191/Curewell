import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute() {
    const currentUser = useSelector((state) => state.user.currentUser);

    // If no user is logged in, redirect to sign in
    if (!currentUser) {
        return <Navigate to="/sign-in" replace />;
    }

    // If user is logged in, render the protected route
    return <Outlet />;
}

export default PrivateRoute;

