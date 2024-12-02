import React from "react";
import { Link } from 'react-router-dom';
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Deep-Sea Monitor</h2>
            <ul>
                <li>
                    <Link to="/">Dashboard</Link>
                </li>
                
                <li>
                    <Link to="/realtime">Real-Time</Link>
                </li>
                <li>
                    <Link to="/visualization">Visualization</Link>
                </li>
                <li>
                    <Link to="/alerts">Alerts</Link>
                </li>
                <li>
                    <Link to="/report">Report</Link>
                </li>
                <li>
                    <Link to="/prediction">Predictions</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
