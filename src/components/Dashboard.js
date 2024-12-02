import React, { useState } from "react";
import { Globe, Activity } from "lucide-react";
import "./DeepSeaMonitoringDashboard.css";

// Location data
const locations = {
  "Mariana Trench": {
    description: "Mariana Trench, Pacific Ocean",
    depth: "10,911 meters",
    coordinates: "11.3°N, 142.2°E",
  },
  "Puerto Rico Trench": {
    description: "Puerto Rico Trench, Atlantic Ocean",
    depth: "8,376 meters",
    coordinates: "19.6°N, 66.5°W",
  },
  "Java Trench": {
    description: "Java Trench, Indian Ocean",
    depth: "7,450 meters",
    coordinates: "10.5°S, 109.8°E",
  },
};

const DeepSeaMonitoringDashboard = () => {
  const [selectedLocation, setSelectedLocation] = useState("Mariana Trench");

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const renderOverview = () => {
    const locationDetails = locations[selectedLocation];

    return (
      <div className="overview-grid">
        <div className="dashboard-card">
          <h2 className="dashboard-card-header">
            <Globe /> Current Location
          </h2>
          <div className="dashboard-card-content">
            <p>{locationDetails.description}</p>
            <p>Depth: {locationDetails.depth}</p>
            <p>Coordinates: {locationDetails.coordinates}</p>
          </div>
          <div>
            <label htmlFor="location-select" className="select-label">
              Select Location:
            </label>
            <select
              id="location-select"
              className="location-select"
              value={selectedLocation}
              onChange={handleLocationChange}
            >
              {Object.keys(locations).map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="dashboard-card">
          <h2 className="dashboard-card-header">
            <Activity /> System Status
          </h2>
          <div className="dashboard-card-content">
            <p>Monitoring Stations: 4 Active</p>
            <p>Data Transmission: Normal</p>
            <p>Last Update: 2 hours ago</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Deep-Sea Environmental Monitoring System</h1>
      </header>

      <main className="dashboard-main">
        {renderOverview()}
      </main>

      <footer className="dashboard-footer">
        © 2024 Deep-Sea Environmental Monitoring Project
      </footer>
    </div>
  );
};

export default DeepSeaMonitoringDashboard;
