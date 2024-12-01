import React, { useState } from 'react';
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
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-blue-800 flex items-center">
        <BarChart2 className="mr-3" /> Environmental Data Visualization
      </h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Temperature Trends</h2>
          <LineChart width={500} height={300} data={sampleEnvironmentalData}>
            <Line type="monotone" dataKey="temperature" stroke="#FF6384" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
          </LineChart>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Depth and Salinity</h2>
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
