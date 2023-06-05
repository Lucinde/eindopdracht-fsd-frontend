import React from 'react';
import './Nav.css';

// import ico_customers from "././assets/icons/customers.svg";

function Nav({ico_customers}) {
    return (
        <header>
            <nav className="outer-container">
                <div className="inner-container flex-row">
                    <h4>PlannerPro</h4>
                    <ul>
                        <li>Hier komt de navigatie</li>
                        <li><img alt="icon customers" src={ico_customers} className="icon"/></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Nav;