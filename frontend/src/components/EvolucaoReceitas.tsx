import React from 'react';
import { Typography } from '@material-ui/core';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface EvolucaoReceitasProps {
  data: Array<{
    mes: string;
    receitas: number;
    despesas: number;
  }>;
}

const EvolucaoReceitas: React.FC<EvolucaoReceitasProps> = ({ data }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Evolução de Receitas e Despesas
      </Typography>
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
    </>
  );
};

export default EvolucaoReceitas;
