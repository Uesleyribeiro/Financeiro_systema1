import React, { useState, useEffect } from 'react';
import { getProjecaoFinanceira } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProjecaoFinanceira: React.FC = () => {
  const [projecao, setProjecao] = useState<any[]>([]);
  const [meses, setMeses] = useState<number>(12);

  useEffect(() => {
    fetchProjecao();
  }, [meses]);

  const fetchProjecao = async () => {
    try {
      const data = await getProjecaoFinanceira(meses);
      setProjecao(data);
    } catch (error) {
      console.error('Erro ao buscar projeção financeira:', error);
    }
  };

  return (
    <div>
      <h2>Projeção Financeira</h2>
      <select value={meses} onChange={(e) => setMeses(Number(e.target.value))}>
        <option value={6}>6 meses</option>
        <option value={12}>12 meses</option>
        <option value={24}>24 meses</option>
      </select>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={projecao}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total_receitas" name="Receitas" stroke="#8884d8" />
          <Line type="monotone" dataKey="total_despesas" name="Despesas" stroke="#82ca9d" />
          <Line type="monotone" dataKey="saldo" name="Saldo" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjecaoFinanceira;
