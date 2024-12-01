import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { 
  Globe, 
  BarChart2, 
  Thermometer, 
  Waves, 
  CloudDrizzle, 
  Activity 
} from 'lucide-react';

// Sample environmental data
const sampleEnvironmentalData = [
  { name: 'Jan', temperature: 4.2, salinity: 34.5, depth: 1000, pressure: 100 },
  { name: 'Feb', temperature: 4.0, salinity: 34.6, depth: 1050, pressure: 105 },
  { name: 'Mar', temperature: 4.3, salinity: 34.4, depth: 980, pressure: 98 },
  { name: 'Apr', temperature: 4.1, salinity: 34.7, depth: 1100, pressure: 110 },
];

const DeepSeaMonitoringDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const renderOverview = () => (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div className="bg-blue-50 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-3 flex items-center">
          <Globe className="mr-2" /> Current Location
        </h2>
        <p>Mariana Trench, Pacific Ocean</p>
        <p>Depth: 10,911 meters</p>
        <p>Coordinates: 11.3°N, 142.2°E</p>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-3 flex items-center">
          <Activity className="mr-2" /> System Status
        </h2>
        <p>Monitoring Stations: 4 Active</p>
        <p>Data Transmission: Normal</p>
        <p>Last Update: 2 hours ago</p>
      </div>
    </div>
  );

  const renderEnvironmentalChart = () => (
    <div className="bg-blue-50 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-3 flex items-center">
        <BarChart2 className="mr-2" /> Environmental Parameters
      </h2>
      <LineChart width={600} height={300} data={sampleEnvironmentalData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="#FF6384" name="Temperature (°C)" />
        <Line type="monotone" dataKey="salinity" stroke="#36A2EB" name="Salinity" />
        <Line type="monotone" dataKey="depth" stroke="#FFCE56" name="Depth (m)" />
        <Line type="monotone" dataKey="pressure" stroke="#4BC0C0" name="Pressure" />
      </LineChart>
    </div>
  );

  const renderParameterCards = () => (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="bg-blue-50 p-4 rounded-lg shadow-md flex items-center">
        <Thermometer className="mr-3 text-blue-600" size={40} />
        <div>
          <h3 className="font-bold">Temperature</h3>
          <p>4.2°C</p>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg shadow-md flex items-center">
        <Waves className="mr-3 text-blue-600" size={40} />
        <div>
          <h3 className="font-bold">Salinity</h3>
          <p>34.5 PSU</p>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg shadow-md flex items-center">
        <CloudDrizzle className="mr-3 text-blue-600" size={40} />
        <div>
          <h3 className="font-bold">Water Pressure</h3>
          <p>100 Bar</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      <header className="bg-blue-800 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Deep-Sea Environmental Monitoring System</h1>
      </header>
      
      <nav className="bg-blue-600 text-white p-3 flex space-x-4">
        <button 
          onClick={() => setActiveSection('overview')}
          className={`px-3 py-1 rounded ${activeSection === 'overview' ? 'bg-blue-700' : 'hover:bg-blue-500'}`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveSection('charts')}
          className={`px-3 py-1 rounded ${activeSection === 'charts' ? 'bg-blue-700' : 'hover:bg-blue-500'}`}
        >
          Environmental Data
        </button>
        <button 
          onClick={() => setActiveSection('parameters')}
          className={`px-3 py-1 rounded ${activeSection === 'parameters' ? 'bg-blue-700' : 'hover:bg-blue-500'}`}
        >
          Key Parameters
        </button>
      </nav>
      
      <main className="container mx-auto">
        {activeSection === 'overview' && renderOverview()}
        {activeSection === 'charts' && renderEnvironmentalChart()}
        {activeSection === 'parameters' && renderParameterCards()}
      </main>
      
      <footer className="bg-blue-800 text-white p-4 text-center">
        © 2024 Deep-Sea Environmental Monitoring Project
      </footer>
    </div>
  );
};

export default DeepSeaMonitoringDashboard;