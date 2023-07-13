import React, {useContext, useState} from 'react';
import './Header.css';
import {IconContext} from "../../context/IconContext";
import {AuthContext} from "../../context/AuthContext";
import {NavLink} from "react-router-dom";
import Modal from "react-modal";
import AddNewCustomer from "../forms/AddNewCustomer";


function Header() {
    const { ico_customers_add, ico_profile, ico_logout } = useContext(IconContext);
    const {logout, username, authority} = useContext(AuthContext);

    const [modalIsOpenAddCustomer, setModalIsOpenAddCustomer] = useState(false);
    Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    Modal.setAppElement('body');

    function closeModalAddCustomer() {
        setModalIsOpenAddCustomer(false);
    }

    return (
        <header>
            <div className="outer-container">
                <div className="inner-container flex-row">
                    <NavLink className="header-logo" to={"/"}><h4>Planner<span className="logo-light"> Pro</span></h4></NavLink>
                    <nav className="quicknav">
                        <ul>
                            {authority === "ROLE_PLANNER" &&
                                <li><button onClick={() => {setModalIsOpenAddCustomer(true)}} className="nav-button"><img alt="icon customers" src={ico_customers_add} className="icon"/></button></li>
                            }
                            <li><img alt="icon profile" src={ico_profile} className="icon"/></li>
                            <li><NavLink to={"/"} onClick={logout}><img alt="icon logout" src={ico_logout} className="icon"/></NavLink></li>
                        </ul>
                        <span>Welkom {username}</span>
                    </nav>
                    <Modal
                        isOpen={modalIsOpenAddCustomer}
                        onRequestClose={closeModalAddCustomer}
                        className={"modal-small"}
                        appElement={document.getElementById('app')}
                    >
                        <AddNewCustomer closeModal={closeModalAddCustomer}/>
                    </Modal>
                </div>
            </div>
        </header>
    );
}

export default Header;