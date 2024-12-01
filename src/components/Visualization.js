import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const sampleData = [
    { name: "Point 1", value: 10 },
    { name: "Point 2", value: 20 },
    { name: "Point 3", value: 15 },
];

const Visualization = () => {
    return (
        <div>
            <h1>Data Visualization</h1>
            <LineChart width={600} height={300} data={sampleData}>
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </div>
    );
};

export default Visualization;
