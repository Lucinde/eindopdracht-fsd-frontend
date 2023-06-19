import './App.css';
import Header from "./components/header/Header";

import Footer from "./components/footer/Footer";
import PlannerHome from "./pages/planner/PlannerHome";
import MechanicHome from "./pages/mechanic/MechanicHome";

function App() {
    return (
        <>
            {/*todo: bepalen of de header en footer met een authorisatie van de pagina's op display: none wordt gezet bij het inloggen of op elke pagina geïmporteerd moet worden*/}
            <Header />
            {/*todo: hier komen de pagina's tussen te staan*/}
            <PlannerHome />
            <MechanicHome />
            <Footer/>
        </>
    );
}

export default App;
