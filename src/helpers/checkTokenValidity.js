import React from 'react';
import jwt_decode from 'jwt-decode';
function CheckTokenValidity(token) {
    const decodedToken = jwt_decode( token );

    const expirationTime = decodedToken.exp * 1000;
    const isExpired = Date.now() > expirationTime;

    return !isExpired;
}

export default CheckTokenValidity;