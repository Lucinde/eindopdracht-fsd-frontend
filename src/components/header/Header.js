import React, {useContext} from 'react';
import './Header.css';
import {IconContext} from "../../context/IconContext";
import {AuthContext} from "../../context/AuthContext";
import {NavLink} from "react-router-dom";


function Header() {
    const { ico_customers_add, ico_tasks_add, ico_profile, ico_logout } = useContext(IconContext);
    const {logout, username} = useContext(AuthContext);

    return (
        <header>
            <div className="outer-container">
                <div className="inner-container flex-row">
                    <h4>Planner<span className="logo-light"> Pro</span></h4>
                    <nav className="quicknav">
                        <ul>
                            <li><NavLink to={"/"}><img alt="icon customers" src={ico_customers_add} className="icon"/></NavLink></li>
                            <li><NavLink to={"/"}><img alt="icon add task" src={ico_tasks_add} className="icon"/></NavLink></li>
                            <li><NavLink to={"/"}><img alt="icon profile" src={ico_profile} className="icon"/></NavLink></li>
                            <li><NavLink to={"/"} onClick={logout}><img alt="icon logout" src={ico_logout} className="icon"/></NavLink></li>
                        </ul>
                        <span>Welkom {username}</span>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;