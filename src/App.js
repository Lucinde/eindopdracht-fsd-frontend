import './App.css';
import Header from "./components/header/Header";

/*** import images **/
import ico_customers from "./assets/icons/customers.svg";

function App() {
  return (
    <>
      <Header ico_customers={ico_customers}/>
    </>
  );
}

export default App;
