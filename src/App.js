import './App.css';
import Header from "./components/header/Header";
import {Routes, Route} from 'react-router-dom';

import Footer from "./components/footer/Footer";
import PlannerHome from "./pages/planner/PlannerHome";
import MechanicHome from "./pages/mechanic/MechanicHome";

function App() {
    return (
        <>
            {/*todo: bepalen of de header en footer met een authorisatie van de pagina's op display: none wordt gezet bij het inloggen of op elke pagina geïmporteerd moet worden*/}
            <Header/>
            <Routes>
                {/*todo: Voorwaarde toevoegen waarin de homepage geredirect wordt naar de planner/mechanic home indien je ingelogd bent, zie aantekeningen routing*/}
                {/*<Route path="/" element={loginpage}/>*/}
                <Route path="/planner" element={<PlannerHome/>}/>
                <Route path="/mechanic" element={<MechanicHome/>}/>
            </Routes>
            <Footer/>
        </>
    );
}

export default App;
