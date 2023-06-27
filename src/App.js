import './App.css';
import Header from "./components/header/Header";
import {Routes, Route} from 'react-router-dom';

import Footer from "./components/footer/Footer";
import PlannerHome from "./pages/planner/PlannerHome";
import MechanicHome from "./pages/mechanic/MechanicHome";
import Login from "./pages/login/Login";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";
import PlannerTasks from "./pages/planner/PlannerTasks";
import PlannerCustomers from "./pages/planner/PlannerCustomers";

function App() {
    const {isAuth} = useContext(AuthContext);
    return (
        <>
            {isAuth && <Header/>}
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/planner" element={<PlannerHome/>}/>
                <Route path="/planner/tasks" element={<PlannerTasks/>}/>
                <Route path="/planner/customers" element={<PlannerCustomers/>}/>
                <Route path="/mechanic" element={<MechanicHome/>}/>
            </Routes>
            {isAuth && <Footer/>}
        </>
    );
}

export default App;
