import React, { useState, useEffect } from "react";
import Papa from "papaparse";

// Function to parse date from CSV in the format MM/DD/YYYY hh:mm AM/PM
const parseCSVDate = (dateString) => {
  if (!dateString || typeof dateString !== "string") {
    console.error("Invalid date string:", dateString);
    return null; // Return null for invalid or missing data
  }

  const [datePart, timePart] = dateString.split(" ");
  if (!datePart || !timePart) {
    console.error("Date string format is incorrect:", dateString);
    return null;
  }

  const [month, day, year] = datePart.split("/");
  let [hours, minutes] = timePart.split(":");

  // Handle 12-hour time format with AM/PM
  const isPM = timePart.includes("PM");
  if (isPM && hours !== "12") {
    hours = String(parseInt(hours) + 12); // Convert PM hours to 24-hour format
  }
  if (!isPM && hours === "12") {
    hours = "00"; // Convert 12 AM to 00 hours
  }

  // Convert to Date object in the local time zone
  return new Date(`${month}/${day}/${year} ${hours}:${minutes}`);
};

const RealTimeData = () => {
  const [csvData, setCsvData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);

  // Load CSV data
  useEffect(() => {
    // Change the path to your actual CSV file
    Papa.parse("/path-to-your-file.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        console.log("CSV Data Loaded:", result.data);
        setCsvData(result.data); // Store the loaded CSV data
      },
      error: (error) => {
        console.error("Error loading CSV data:", error);
      },
    });
  }, []);

  // Function to handle date selection
  const handleDateChange = (e) => {
    const selected = new Date(e.target.value);
    setSelectedDate(selected);
  };

  // Format the selected date as MM/DD/YYYY hh:mm AM/PM for input
  const formatSelectedDate = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedDate = `${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()} ${hours}:${minutes} ${ampm}`;
    return formattedDate;
  };

  // Filter data based on the selected date and time (compare both date and time)
  useEffect(() => {
    if (csvData.length > 0) {
      const filtered = csvData.filter((data) => {
        if (!data || !data["Date and Time"]) {
          console.error("Missing or invalid data:", data);
          return false;
        }

        const dataDate = parseCSVDate(data["Date and Time"]);
        if (!dataDate) {
          console.error("Failed to parse date from data:", data);
          return false;
        }

        // Compare both date and time parts of selectedDate and dataDate
        const isSameDateAndTime =
          dataDate.getFullYear() === selectedDate.getFullYear() &&
          dataDate.getMonth() === selectedDate.getMonth() &&
          dataDate.getDate() === selectedDate.getDate() &&
          dataDate.getHours() === selectedDate.getHours() &&
          dataDate.getMinutes() === selectedDate.getMinutes();

        return isSameDateAndTime;
      });

      setFilteredData(filtered);
    }
  }, [selectedDate, csvData]);

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
