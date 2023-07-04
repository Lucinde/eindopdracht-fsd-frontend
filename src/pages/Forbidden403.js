import React from 'react';
import configData from "../config.json";

function Forbidden403(props) {
    const adminEmail = `${configData.ADMIN_EMAIL}`;

    return (
        <main className="forbidden-403">
            <div className="outer-container">
                <div className="inner-container">
                    <h1>Sorry!</h1>
                    <p>Je bent niet gemachtigd deze pagina te bekijken!</p>
                    <p> Neem contact op met de beheerder via <a href={`mailto:${adminEmail}`}>{adminEmail}</a> als je denkt dat je deze pagina wel
                        nodig hebt.</p>
                </div>
            </div>
        </main>
    );
}

export default Forbidden403;