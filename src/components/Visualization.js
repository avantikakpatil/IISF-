import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import {
    Globe,
    BarChart2,
    Thermometer,
    Waves,
    CloudDrizzle,
    Activity,
    Map,
    Settings
} from 'lucide-react';
import './environmental-visualization.css';

// Sample Environmental Data for Visualization
const sampleEnvironmentalData = [
    { name: "Jan", temperature: 4.2, salinity: 34.5, depth: 1000 },
    { name: "Feb", temperature: 4.0, salinity: 34.6, depth: 1050 },
    { name: "Mar", temperature: 4.3, salinity: 34.4, depth: 980 },
    { name: "Apr", temperature: 4.1, salinity: 34.7, depth: 1100 },
    { name: "May", temperature: 4.4, salinity: 34.3, depth: 1020 }
];

// Visualization Component
const Visualization = () => {
    return (
        <div className="visualization-container">
            <h1 className="visualization-header">
                <BarChart2 /> Environmental Data Visualization
            </h1>

            <div className="charts-grid">
                <div className="chart-card">
                    <h2 className="chart-title">Temperature Trends</h2>
                    <LineChart width={500} height={300} data={sampleEnvironmentalData}>
                        <Line type="monotone" dataKey="temperature" stroke="#FF6384" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                    </LineChart>
                </div>

                <div className="chart-card">
                    <h2 className="chart-title">Depth and Salinity</h2>
                    <LineChart width={500} height={300} data={sampleEnvironmentalData}>
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'Measurements', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="depth" stroke="#36A2EB" name="Depth (m)" />
                        <Line type="monotone" dataKey="salinity" stroke="#4BC0C0" name="Salinity" />
                    </LineChart>
                </div>
            </div>
        </div>
    );
};

export default Visualization;