import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import DataUpload from "./components/DataUpload";
import RealTimeData from "./components/RealTimeData";
import Visualization from "./components/Visualization";
import Alerts from "./components/Alerts";

const App = () => {
    return (
        <Router>
            <div style={{ display: "flex" }}>
                <Sidebar />
                <main style={{ marginLeft: "250px", padding: "20px", width: "100%" }}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/upload" element={<DataUpload />} />
                        <Route path="/realtime" element={<RealTimeData />} />
                        <Route path="/visualization" element={<Visualization />} />
                        <Route path="/alerts" element={<Alerts />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
