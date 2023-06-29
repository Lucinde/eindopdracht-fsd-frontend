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
import PrivateRoute from "./components/Routing/PrivateRoute";
import Forbidden403 from "./pages/Forbidden403";

function App() {
    const {isAuth, authority} = useContext(AuthContext);
    return (
        <>
            {isAuth && <Header/>}
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/planner" element={<PrivateRoute auth={isAuth} role={authority} allowedRoles={["ROLE_PLANNER"]}> <PlannerHome/> </PrivateRoute>}/>
                <Route path="/planner/tasks" element={<PrivateRoute auth={isAuth} role={authority} allowedRoles={["ROLE_PLANNER"]}> <PlannerTasks/> </PrivateRoute>}/>
                <Route path="/planner/customers" element={<PrivateRoute auth={isAuth} role={authority} allowedRoles={["ROLE_PLANNER"]}> <PlannerCustomers/> </PrivateRoute>}/>
                <Route path="/mechanic" element={<PrivateRoute auth={isAuth} role={authority} allowedRoles={["ROLE_MECHANIC"]}> <MechanicHome/> </PrivateRoute>}/>
                <Route path="/403" element={<Forbidden403/>}/>
            </Routes>
            {isAuth && <Footer/>}
        </>
    );
}

export default App;
