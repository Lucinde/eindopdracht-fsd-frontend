import React from 'react';

function ViewTask({task}) {
    return (
        <article>
            <h2>Details Taak</h2>
            <div className="task-intro">
                <div className="customer-details">
                    <p>Klant: {task.customer.firstName} {task.customer.lastName}</p>
                    <p>Adres: {task.customer.address} {task.customer.zip} {task.customer.city}</p>
                </div>
                <div className="planning-details">
                    <p>Ingepland op:</p>
                    <p>Datum en tijd{/*todo: map hier de tasklist van de klant*/}</p>
                </div>
            </div>
            <p>Taakomschrijving:</p>
            <p>{task.description}</p>
        </article>
    );
}

export default ViewTask;