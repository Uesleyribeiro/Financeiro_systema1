import React, { useState, useEffect } from 'react';
import { getDashboardData } from '../services/api';
import EvolucaoGrafico from '../components/EvolucaoGrafico';
import TopDespesasGrafico from '../components/TopDespesasGrafico';

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Resumo do Mês</h2>
        <p>Receitas: R$ {dashboardData.receitas_mes.toFixed(2)}</p>
        <p>Despesas: R$ {dashboardData.despesas_mes.toFixed(2)}</p>
        <p>Saldo: R$ {dashboardData.saldo_mes.toFixed(2)}</p>
      </div>
      <div>
        <h2>Evolução de Receitas e Despesas</h2>
        <EvolucaoGrafico data={dashboardData.evolucao} />
      </div>
      <div>
        <h2>Top 5 Categorias de Despesas</h2>
        <TopDespesasGrafico data={dashboardData.top_despesas} />
      </div>
    </div>
  );
};

export default Dashboard;
