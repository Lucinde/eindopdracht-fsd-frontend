import React, {createContext, useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import {useNavigate} from "react-router-dom";
import checkTokenValidity from "../helpers/checkTokenValidity";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {

    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending"
    });
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (storedToken && checkTokenValidity(storedToken)) {
            void login(storedToken)
        } else {
            void logout()
        }

    }, [])

    async function login(jwt_token, redirect) {
        const decodedToken = jwt_decode(jwt_token);
        localStorage.setItem('token', jwt_token);
        console.log(decodedToken)
        try {
            const response = await axios.get(`http://localhost:3000/600/users/${decodedToken.sub}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt_token}`
                }
            })
            setAuth({
                ...auth,
                isAuth: true,
                user: {
                    email,
                    id,
                    username
                },
                status: "done"
            })
            console.log('De gebruiker is ingelogd 🔓')
            if (redirect) navigate(redirect);
        } catch (e) {
            console.error(e)
        }
    }

    function logout() {
        localStorage.removeItem('token');
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
            status: "done"
        })
        console.log('De gebruiker is uitgelogd 🔒')
        navigate('/')
    }

    const data = {
        isAuth: auth.isAuth,
        user: auth.user,
        logout: logout,
        login: login
    }


    return (
        <AuthContext.Provider value={data}>
            {auth.status === "done" ? children : <p>loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;