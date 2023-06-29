import React from 'react';
import {Navigate} from "react-router-dom";

function PrivateRoute({auth, role, allowedRoles, children}) {
    if(auth && allowedRoles.includes(role)) {
        return children;
    } else if(auth) {
        return <Navigate to="/403" replace />;
    } else {
        return <Navigate to="/" replace />;
    }
}

export default PrivateRoute;