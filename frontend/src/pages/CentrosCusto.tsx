import React, { useState, useEffect } from 'react';
import CentroCustoForm from '../components/CentroCustoForm';
import CentroCustoList from '../components/CentroCustoList';
import { getCentrosCusto, deleteCentroCusto } from '../services/api';
import { CentroCusto } from '../types';

const CentrosCusto: React.FC = () => {
  const [centrosCusto, setCentrosCusto] = useState<CentroCusto[]>([]);

  useEffect(() => {
    fetchCentrosCusto();
  }, []);

  const fetchCentrosCusto = async () => {
    try {
      const data = await getCentrosCusto();
      setCentrosCusto(data);
    } catch (error) {
      console.error('Erro ao buscar centros de custo:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCentroCusto(id);
      fetchCentrosCusto();
    } catch (error) {
      console.error('Erro ao deletar centro de custo:', error);
    }
  };

  return (
    <div>
      <h1>Centros de Custo</h1>
      <CentroCustoForm onCentroCustoAdded={fetchCentrosCusto} />
      <CentroCustoList centrosCusto={centrosCusto} onDelete={handleDelete} />
    </div>
  );
};

export default CentrosCusto;
