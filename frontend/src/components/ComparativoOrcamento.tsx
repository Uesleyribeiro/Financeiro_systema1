import React, { useState, useEffect } from 'react';
import { obterComparativoOrcamento } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ComparativoOrcamento: React.FC = () => {
  const [comparativo, setComparativo] = useState<any[]>([]);
  const [ano, setAno] = useState<number>(new Date().getFullYear());
  const [mes, setMes] = useState<number>(new Date().getMonth() + 1);

  useEffect(() => {
    fetchComparativo();
  }, [ano, mes]);

  const fetchComparativo = async () => {
    try {
      const data = await obterComparativoOrcamento(ano, mes);
      setComparativo(data);
    } catch (error) {
      console.error('Erro ao buscar comparativo:', error);
    }
  };

  return (
    <div>
      <h2>Comparativo Orçado x Realizado</h2>
      <input type="number" value={ano} onChange={(e) => setAno(Number(e.target.value))} placeholder="Ano" />
      <input type="number" value={mes} onChange={(e) => setMes(Number(e.target.value))} placeholder="Mês" min="1" max="12" />
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={comparativo}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="categoria" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="previsto" fill="#8884d8" name="Orçado" />
          <Bar dataKey="realizado" fill="#82ca9d" name="Realizado" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparativoOrcamento;
