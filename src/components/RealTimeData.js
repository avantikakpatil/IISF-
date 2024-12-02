import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Papa from "papaparse"; // For parsing CSV
import "./RealTimeData.css";

const GlobalStyles = () => (
  <style jsx global>{`
    body, html {
      margin: 0;
      padding: 0;
      font-family: "Arial", sans-serif;
      background-color: #f0f4f8;
    }
  `}</style>
);

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
  const [csvData, setCsvData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch and parse CSV on component mount
  useEffect(() => {
    const fetchAndParseCSV = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/data/environmental_data.csv"); // Update the path as per your project structure
        const rawCsvData = await response.text();
        const parsedData = await new Promise((resolve, reject) => {
          Papa.parse(rawCsvData, {
            header: true,
            complete: (results) => resolve(results.data),
            error: (err) => reject(err),
          });
        });

        setCsvData(parsedData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching and parsing CSV:", err);
        setError("Failed to load CSV data.");
        setIsLoading(false);
      }
    };

    fetchAndParseCSV();
  }, []);

  const fetchEnvironmentalData = (timestamp) => {
    try {
      setIsLoading(true);
      const formattedDate = timestamp.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
      const matchedData = csvData.find((row) => row.date === formattedDate);

      if (!matchedData) {
        throw new Error("No data found for the selected date.");
      }

      // Map matched data to state
      setEnvironmentalData({
        depth: matchedData.depth || null,
        temperature: matchedData.temperature || null,
        salinity: matchedData.salinity || null,
        pressure: matchedData.pressure || null,
        oxygenLevel: matchedData.oxygenLevel || null,
        currentSpeed: matchedData.currentSpeed || null,
        pH: matchedData.pH || null,
      });

      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching environmental data:", err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (csvData.length > 0) {
      fetchEnvironmentalData(selectedDate);
    }
  }, [selectedDate, csvData]);

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
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Real-Time Data Display</h1>
      
      {/* Date Picker */}
      <input
        type="datetime-local"
        onChange={handleDateChange}
        value={formatSelectedDate(selectedDate)}  // Ensure the correct format is set
      />
      
      {/* Display the selected date */}
      <h2>Selected Date: {formatSelectedDate(selectedDate)}</h2>
      
      {/* Display the filtered data */}
      {filteredData.length > 0 ? (
        <div>
          <h3>Data for {formatSelectedDate(selectedDate)}:</h3>
          <table>
            <thead>
              <tr>
                <th>Temperature (°C)</th>
                <th>Pressure (bar)</th>
                <th>Salinity (PSU)</th>
                <th>Oxygen Level (mg/L)</th>
                <th>pH Levels</th>
                <th>Biodiversity (Species Count)</th>
                <th>Pollutants (ppm)</th>
                <th>Ocean Currents (m/s)</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, index) => (
                <tr key={index}>
                  <td>{data["Temperature (°C)"]}</td>
                  <td>{data["Pressure (bar)"]}</td>
                  <td>{data["Salinity (PSU)"]}</td>
                  <td>{data["Oxygen Level (mg/L)"]}</td>
                  <td>{data["pH Levels"]}</td>
                  <td>{data["Biodiversity (Species Count)"]}</td>
                  <td>{data["Pollutants (ppm)"]}</td>
                  <td>{data["Ocean Currents (m/s)"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No data available for the selected date and time</p>
      )}
    </div>
  );
};

export default RealTimeData;
