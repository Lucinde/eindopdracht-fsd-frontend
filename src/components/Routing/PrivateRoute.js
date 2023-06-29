import React from 'react';
import {Navigate} from "react-router-dom";

// todo: else if toevoegen die wanneer je ingelogd bent een 403-forbidden aangeeft wanneer je naar een verkeerde pagina gaat ipv weer naar de login te gaan?
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