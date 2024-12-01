import React from "react";

const sampleAlerts = [
    { id: 1, message: "High temperature detected!" },
    { id: 2, message: "Low oxygen levels detected!" },
];

const Alerts = () => {
    return (
        <div>
            <h1>Alerts</h1>
            <ul>
                {sampleAlerts.map((alert) => (
                    <li key={alert.id}>{alert.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default Alerts;
