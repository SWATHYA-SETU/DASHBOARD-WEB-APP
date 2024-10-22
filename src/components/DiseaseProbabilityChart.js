import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const DiseaseProbabilityChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="disease" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" />
        <Bar dataKey="probability" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DiseaseProbabilityChart;
