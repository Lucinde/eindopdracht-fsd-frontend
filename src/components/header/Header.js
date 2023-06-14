import React, {useContext} from 'react';
import './Header.css';
import {IconContext} from "../../context/IconContext";


function Header() {
    const { ico_customers_add, ico_tasks_add, ico_profile, ico_logout } = useContext(IconContext);
    return (
        <header>
            <div className="outer-container">
                <div className="inner-container flex-row">
                    <h4>Planner<span className="logo-light"> Pro</span></h4>
                    <nav className="quicknav">
                        <ul>
                            <li><a><img alt="icon customers" src={ico_customers_add} className="icon"/></a></li>
                            <li><a><img alt="icon add task" src={ico_tasks_add} className="icon"/></a></li>
                            <li><a><img alt="icon profile" src={ico_profile} className="icon"/></a></li>
                            <li><a><img alt="icon logout" src={ico_logout} className="icon"/></a></li>
                        </ul>
                        <span>Planner naam</span>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;