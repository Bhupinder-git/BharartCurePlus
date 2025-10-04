import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({isLoggedIn, children}) => {
    if(isLoggedIn)
        return children;
    else
        return <Navigate to='/login' replace/>
}

export default ProtectedRoute
