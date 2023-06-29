import React, {createContext, useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import {useNavigate} from "react-router-dom";
import checkTokenValidity from "../helpers/checkTokenValidity";
import axios from "axios";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {

    const [auth, setAuth] = useState({
        isAuth: false,
        username: null,
        authority: null,
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
        try {
            const response = await axios.get(`http://localhost:8080/authenticated`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt_token}`
                }
            })
            setAuth({
                ...auth,
                isAuth: true,
                username: response.data.name,
                authority: response.data.authorities[0].authority,
                status: "done"
            })

            if (redirect) {
                redirectLogin(response.data.authorities[0].authority);
            }

        } catch (e) {
            console.error(e)
        }
    }

    function redirectLogin(authority) {
        if (authority === "ROLE_PLANNER") {
            navigate("/planner");
        } else if (authority === "ROLE_MECHANIC") {
            navigate("/mechanic");
        } else {
            navigate("/");
            //todo: hier misschien nog een betere oplossing voor vinden met foutmelding? Wanneer je nu iets verkeerd inlogt blijf je op de homepage maar dat is natuurlijk ook wel de bedoeling... Goed over nadenken
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
        navigate('/')
    }

    const authData = {
        isAuth: auth.isAuth,
        username: auth.username,
        authority: auth.authority,
        logout: logout,
        login: login
    }

    return (
        <AuthContext.Provider value={authData}>
            {auth.status === "done" ? children : <p>loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;