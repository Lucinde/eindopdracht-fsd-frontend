import React, {useContext, useState} from 'react';
import './Header.css';
import {IconContext} from "../../context/IconContext";
import {AuthContext} from "../../context/AuthContext";
import {NavLink} from "react-router-dom";
import Modal from "react-modal";
import ViewCustomer from "../tables/ViewCustomer";
import AddNewTask from "../forms/AddNewTask";


function Header() {
    const { ico_customers_add, ico_tasks_add, ico_profile, ico_logout } = useContext(IconContext);
    const {logout, username} = useContext(AuthContext);

    const [modalIsOpenAddTask, setModalIsOpenAddTask] = useState(false);
    Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    Modal.setAppElement('body');

    function closeModalAddTask() {
        // todo: hier nog functionaliteit toevoegen die moet gebeuren waneer de modal gesloten wordt (Post request?)
        setModalIsOpenAddTask(false);
    }

    return (
        <header>
            <div className="outer-container">
                <div className="inner-container flex-row">
                    <h4>Planner<span className="logo-light"> Pro</span></h4>
                    <nav className="quicknav">
                        <ul>
                            <li><NavLink to={"/"}><img alt="icon customers" src={ico_customers_add} className="icon"/></NavLink></li>
                            <li><button onClick={() => {setModalIsOpenAddTask(true)}} className="nav-button"><img alt="icon add task" src={ico_tasks_add} className="icon"/></button></li>
                            <li><img alt="icon profile" src={ico_profile} className="icon"/></li>
                            <li><NavLink to={"/"} onClick={logout}><img alt="icon logout" src={ico_logout} className="icon"/></NavLink></li>
                        </ul>
                        <span>Welkom {username}</span>
                    </nav>
                    <Modal
                        isOpen={modalIsOpenAddTask}
                        onRequestClose={closeModalAddTask}
                        className={"modal"}
                        appElement={document.getElementById('app')}
                    >
                        <AddNewTask/>
                    </Modal>
                </div>
            </div>
        </header>
    );
}

export default Header;