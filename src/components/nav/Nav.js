import React from 'react';
import './Nav.css';

function Nav(props) {
    return (
        <header>
            <nav className="outer-container">
                <div className="inner-container flex-row">
                    <h4>PlannerPro</h4>
                    <ul>
                        <li>Hier komt de navigatie</li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Nav;