import React, { useEffect, useState } from "react";
import axios from "axios";

// Sample dummy data
const dummyData = {
  depth: 5000,
  temperature: 4.2,
  salinity: 35.4,
  pressure: 500,
  oxygenLevel: 7.8,
  currentSpeed: 1.2,
  pH: 7.9
};

const RealTimeData = () => {
    const [environmentalData, setEnvironmentalData] = useState({
        depth: null,
        temperature: null,
        salinity: null,
        pressure: null,
        oxygenLevel: null,
        currentSpeed: null,
        pH: null
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEnvironmentalData = async () => {
            try {
                setIsLoading(true);
                // Simulate an API call with dummy data (replace with actual API when available)
                // const response = await axios.get("https://deep-sea-monitoring-api.example.com/environmental-data");

                // Use dummy data here to simulate real-time data
                const response = {
                    data: dummyData
                };

                // Map API response to our state structure
                setEnvironmentalData({
                    depth: response.data.depth || null,
                    temperature: response.data.temperature || null,
                    salinity: response.data.salinity || null,
                    pressure: response.data.pressure || null,
                    oxygenLevel: response.data.oxygenLevel || null,
                    currentSpeed: response.data.currentSpeed || null,
                    pH: response.data.pH || null
                });
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching deep-sea environmental data:", error);
                setError(error);
                setIsLoading(false);
            }
        };

        // Initial fetch
        fetchEnvironmentalData();

        // Polling interval for real-time updates (every 5 minutes)
        const intervalId = setInterval(fetchEnvironmentalData, 300000);

        // Cleanup function
        return () => clearInterval(intervalId);
    }, []);

    // Styled component for parameter display
    const ParameterDisplay = ({ label, value, unit }) => (
        <div className="bg-white p-3 rounded-md shadow-sm mb-2">
            <span className="font-bold text-gray-700">{label}: </span>
            <span className="text-blue-600">
                {value !== null ? `${value} ${unit}` : 'No data'}
            </span>
        </div>
    );

    if (isLoading) {
        return (
            <div className="text-center text-blue-500 p-4">
                Initializing Deep-Sea Monitoring Systems...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-4">
                Error Retrieving Environmental Data
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
                Deep-Sea Environmental Monitoring
            </h2>
            
            <ParameterDisplay 
                label="Water Depth" 
                value={environmentalData.depth} 
                unit="meters" 
            />
            <ParameterDisplay 
                label="Water Temperature" 
                value={environmentalData.temperature} 
                unit="°C" 
            />
            <ParameterDisplay 
                label="Salinity" 
                value={environmentalData.salinity} 
                unit="PSU" 
            />
            <ParameterDisplay 
                label="Hydrostatic Pressure" 
                value={environmentalData.pressure} 
                unit="dBar" 
            />
            <ParameterDisplay 
                label="Dissolved Oxygen" 
                value={environmentalData.oxygenLevel} 
                unit="mg/L" 
            />
            <ParameterDisplay 
                label="Ocean Current Speed" 
                value={environmentalData.currentSpeed} 
                unit="m/s" 
            />
            <ParameterDisplay 
                label="Water pH" 
                value={environmentalData.pH} 
                unit="pH scale" 
            />
        </div>
    );
};

export default RealTimeData;
