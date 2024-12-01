import React, { useEffect, useState } from "react";
import axios from "axios";

const RealTimeData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://api.example.com/realtime-data");
                setData(response.data);
            } catch (error) {
                console.error("Error fetching real-time data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Real-Time Data</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item.name}: {item.value}</li>
                ))}
            </ul>
        </div>
    );
};

export default RealTimeData;
