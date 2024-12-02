import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

const Prediction = () => {
  const [predictionData] = useState([
    { year: 2024, waterTemperature: 4.2, acidityLevel: 8.1, oxygenConcentration: 6.5, biodiversityIndex: 0.75 },
    { year: 2025, waterTemperature: 4.4, acidityLevel: 8.0, oxygenConcentration: 6.3, biodiversityIndex: 0.72 },
    { year: 2026, waterTemperature: 4.6, acidityLevel: 7.9, oxygenConcentration: 6.1, biodiversityIndex: 0.68 },
    { year: 2027, waterTemperature: 4.8, acidityLevel: 7.8, oxygenConcentration: 5.9, biodiversityIndex: 0.65 },
  ]);

  return (
    <Card style={{ margin: '20px auto', maxWidth: '900px', padding: '20px' }}>
      <CardContent>
        <Typography variant="h4" align="center" gutterBottom>
          Deep-Sea Environmental Predictions
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <Typography variant="h6">Water Temperature Projection</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={predictionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis label={{ value: '°C', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="waterTemperature" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div>
            <Typography variant="h6">Acidity Level Projection</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={predictionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis label={{ value: 'pH', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="acidityLevel" stroke="#82ca9d" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Prediction;
