import React from 'react';
import { Typography, Grid } from '@material-ui/core';

interface ResumoFinanceiroProps {
  data: {
    receitasMes: number;
    despesasMes: number;
    saldoMes: number;
  };
}

const ResumoFinanceiro: React.FC<ResumoFinanceiroProps> = ({ data }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Resumo Financeiro do Mês
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="subtitle1">Receitas</Typography>
          <Typography variant="h6" color="primary">
            R$ {data.receitasMes.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1">Despesas</Typography>
          <Typography variant="h6" color="secondary">
            R$ {data.despesasMes.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1">Saldo</Typography>
          <Typography variant="h6" color={data.saldoMes >= 0 ? "primary" : "secondary"}>
            R$ {data.saldoMes.toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default ResumoFinanceiro;
