import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface EvolucaoGraficoProps {
  data: Array<{
    mes: string;
    receitas: number;
    despesas: number;
  }>;
}

const EvolucaoGrafico: React.FC<EvolucaoGraficoProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="receitas" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="despesas" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EvolucaoGrafico;
