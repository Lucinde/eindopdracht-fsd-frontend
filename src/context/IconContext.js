import React, {createContext} from 'react';

import ico_next from "../assets/icons/arrow_next.svg";
import ico_prev from "../assets/icons/arrow_previous.svg";
import ico_customers from "../assets/icons/customers.svg";
import ico_customers_add from "../assets/icons/customers-add.svg";
import ico_dashboard from "../assets/icons/dashboard.svg";
import ico_delete from "../assets/icons/delete.svg";
import ico_logout from "../assets/icons/logout.svg";
import ico_mechanic from "../assets/icons/mechanic.svg";
import ico_planning from "../assets/icons/planning.svg";
import ico_profile from "../assets/icons/profile.svg";
import ico_tasks_add from "../assets/icons/task-add.svg";
import ico_tasks from "../assets/icons/tasks.svg";

export const IconContext = createContext(null);

const IconContextProvider = ({children}) => {
    const data= {
        ico_next,
        ico_prev,
        ico_customers,
        ico_customers_add,
        ico_dashboard,
        ico_delete,
        ico_logout,
        ico_mechanic,
        ico_planning,
        ico_profile,
        ico_tasks_add,
        ico_tasks
    }

    return (
        <IconContext.Provider value={data}>
            {children}
        </IconContext.Provider>
    )
};

export default IconContextProvider;