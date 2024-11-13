import React, { useState, useEffect } from 'react';
import { getFluxoCaixaProjetado } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FluxoCaixaProjetado: React.FC = () => {
  const [projecao, setProjecao] = useState<any[]>([]);
  const [meses, setMeses] = useState<number>(3);

  useEffect(() => {
    fetchProjecao();
  }, [meses]);

  const fetchProjecao = async () => {
    try {
      const projecaoData = await getFluxoCaixaProjetado(meses);
      setProjecao(projecaoData);
    } catch (error) {
      console.error('Erro ao buscar fluxo de caixa projetado:', error);
    }
  };

  return (
    <div>
      <h2>Fluxo de Caixa Projetado</h2>
      <select value={meses} onChange={(e) => setMeses(Number(e.target.value))}>
        <option value={3}>3 meses</option>
        <option value={6}>6 meses</option>
        <option value={12}>12 meses</option>
      </select>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={projecao}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="receitas_previstas" name="Receitas" stroke="#8884d8" />
          <Line type="monotone" dataKey="despesas_previstas" name="Despesas" stroke="#82ca9d" />
          <Line type="monotone" dataKey="saldo_projetado" name="Saldo" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FluxoCaixaProjetado;
