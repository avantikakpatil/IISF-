import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles
import "./RealTimeData.css";

const GlobalStyles = () => (
  <style jsx global>{`
    body, html {
      margin: 0;
      padding: 0;
      font-family: "Arial", sans-serif;
      background-color: #f0f4f8;
    }
    /* Add custom styles here */
  `}</style>
);

// Sample dummy data
const dummyData = {
  depth: 5000,
  temperature: 4.2,
  salinity: 35.4,
  pressure: 500,
  oxygenLevel: 7.8,
  currentSpeed: 1.2,
  pH: 7.9,
};

const RealTimeData = () => {
  const [environmentalData, setEnvironmentalData] = useState({
    depth: null,
    temperature: null,
    salinity: null,
    pressure: null,
    oxygenLevel: null,
    currentSpeed: null,
    pH: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchEnvironmentalData = async (timestamp) => {
    try {
      setIsLoading(true);
      // Simulate an API call with dummy data
      const response = {
        data: dummyData,
      };

      // Map API response to our state structure
      setEnvironmentalData({
        depth: response.data.depth || null,
        temperature: response.data.temperature || null,
        salinity: response.data.salinity || null,
        pressure: response.data.pressure || null,
        oxygenLevel: response.data.oxygenLevel || null,
        currentSpeed: response.data.currentSpeed || null,
        pH: response.data.pH || null,
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching deep-sea environmental data:", error);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch for the selected date
    fetchEnvironmentalData(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const ParameterDisplay = ({ label, value, unit }) => (
    <div className="parameter-item">
      <div>
        <div className="parameter-label">{label}</div>
        <div className="parameter-value">
          {value !== null ? `${value} ${unit}` : <span className="parameter-value-missing">Data Unavailable</span>}
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-wave">🌊</div>
        <div className="loading-text">Fetching Real-Time Environmental Data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <div className="error-card">
          <div className="error-icon">❌</div>
          <div className="error-title">Failed to Fetch Data</div>
          <div className="error-message">There was an issue while fetching the environmental data. Please try again later.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="monitoring-container">
      <GlobalStyles />
      <div className="data-card">
        <div className="card-header">
          <h2>Real-Time Environmental Monitoring</h2>
          <p>Monitoring the deep-sea environment in real-time</p>
          <div>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="date-picker"
            />
          </div>
        </div>
        <div className="parameters-grid">
          <ParameterDisplay label="Depth" value={environmentalData.depth} unit="m" />
          <ParameterDisplay label="Temperature" value={environmentalData.temperature} unit="°C" />
          <ParameterDisplay label="Salinity" value={environmentalData.salinity} unit="PSU" />
          <ParameterDisplay label="Pressure" value={environmentalData.pressure} unit="dBar" />
          <ParameterDisplay label="Oxygen Level" value={environmentalData.oxygenLevel} unit="mg/L" />
          <ParameterDisplay label="Current Speed" value={environmentalData.currentSpeed} unit="m/s" />
          <ParameterDisplay label="pH" value={environmentalData.pH} unit="" />
        </div>
      </div>
    </div>
  );
};

export default RealTimeData;
