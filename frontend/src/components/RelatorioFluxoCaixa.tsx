import React, { useState, useEffect } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { getFluxoCaixa } from '../services/api';

const RelatorioFluxoCaixa: React.FC = () => {
  const [fluxoCaixa, setFluxoCaixa] = useState<any>(null);

  useEffect(() => {
    const fetchFluxoCaixa = async () => {
      try {
        const hoje = new Date();
        const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        const fimMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
        const data = await getFluxoCaixa(inicioMes.toISOString(), fimMes.toISOString());
        setFluxoCaixa(data);
      } catch (error) {
        console.error('Erro ao buscar fluxo de caixa:', error);
      }
    };
    fetchFluxoCaixa();
  }, []);

  if (!fluxoCaixa) return <Typography>Carregando...</Typography>;

  return (
    <Paper>
      <Typography variant="h6">Fluxo de Caixa do Mês</Typography>
      <Typography>Receitas: R$ {fluxoCaixa.receitas.toFixed(2)}</Typography>
      <Typography>Despesas: R$ {fluxoCaixa.despesas.toFixed(2)}</Typography>
      <Typography>Saldo: R$ {fluxoCaixa.saldo.toFixed(2)}</Typography>
    </Paper>
  );
};

export default RelatorioFluxoCaixa;
