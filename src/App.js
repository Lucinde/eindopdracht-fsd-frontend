import './App.css';
import Header from "./components/header/Header";

/*** import icons **/
import ico_next from "./assets/icons/arrow_next.svg";
import ico_prev from "./assets/icons/arrow_previous.svg";
import ico_customers from "./assets/icons/customers.svg";
import ico_customers_add from "./assets/icons/customers-add.svg";
import ico_dashboard from "./assets/icons/dashboard.svg";
import ico_delete from "./assets/icons/delete.svg";
import ico_logout from "./assets/icons/logout.svg";
import ico_mechanic from "./assets/icons/mechanic.svg";
import ico_planning from "./assets/icons/planning.svg";
import ico_profile from "./assets/icons/profile.svg";
import ico_tasks_add from "./assets/icons/task-add.svg";
import ico_tasks from "./assets/icons/tasks.svg";

function App() {
  return (
    <>
      <Header
          ico_customers_add={ico_customers_add}
          ico_tasks_add={ico_tasks_add}
          ico_profile={ico_profile}
          ico_logout={ico_logout}
      />
    </>
  );
}

export default App;
