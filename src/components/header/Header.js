import React from 'react';
import './Header.css';

// import ico_customers from "././assets/icons/customers.svg";

function Header({ico_customers_add, ico_tasks_add, ico_profile, ico_logout}) {
    return (
        <header>
            <div className="outer-container">
                <div className="inner-container flex-row">
                    <h4>Planner<span className="h4-light"> Pro</span></h4>
                    <nav className="quicknav">
                        <ul>
                            <li><img alt="icon customers" src={ico_customers_add} className="icon"/></li>
                            <li><img alt="icon add task" src={ico_tasks_add} className="icon"/></li>
                            <li><img alt="icon profile" src={ico_profile} className="icon"/></li>
                            <li><img alt="icon logout" src={ico_logout} className="icon"/></li>
                        </ul>
                        <span>Planner naam</span>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;