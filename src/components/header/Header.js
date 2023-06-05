import React from 'react';
import './Header.css';

// import ico_customers from "././assets/icons/customers.svg";

function Header({ico_customers}) {
    return (
        <header>
            <div className="outer-container">
                <div className="inner-container flex-row">
                    <h4>PlannerPro</h4>
                    <nav className="quicknav">
                        <ul>
                            <li>Hier komt de navigatie</li>
                            <li><img alt="icon customers" src={ico_customers} className="icon"/></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;