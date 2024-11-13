import React, { useState, useEffect } from 'react';
import LancamentoForm from '../components/LancamentoForm';
import LancamentoList from '../components/LancamentoList';
import { getLancamentos } from '../services/api';
import { Lancamento } from '../types';
import ImportarExtrato from '../components/ImportarExtrato';

const Lancamentos: React.FC = () => {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);

  useEffect(() => {
    fetchLancamentos();
  }, []);

  const fetchLancamentos = async () => {
    try {
      const data = await getLancamentos();
      setLancamentos(data);
    } catch (error) {
      console.error('Erro ao buscar lançamentos:', error);
    }
  };

  return (
    <div>
      <h1>Lançamentos</h1>
      <LancamentoForm onLancamentoAdded={fetchLancamentos} />
      <LancamentoList lancamentos={lancamentos} />
    </div>
  );
};

export default Lancamentos;
