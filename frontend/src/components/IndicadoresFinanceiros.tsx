import React from 'react';
import { Typography, Grid } from '@material-ui/core';

interface IndicadoresFinanceirosProps {
  data: {
    margemLucro: number;
    retornoInvestimento: number;
    liquidezCorrente: number;
  };
}

const IndicadoresFinanceiros: React.FC<IndicadoresFinanceirosProps> = ({ data }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Indicadores Financeiros
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="subtitle1">Margem de Lucro</Typography>
          <Typography variant="h6">
            {data.margemLucro.toFixed(2)}%
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1">ROI</Typography>
          <Typography variant="h6">
            {data.retornoInvestimento.toFixed(2)}%
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1">Liquidez Corrente</Typography>
          <Typography variant="h6">
            {data.liquidezCorrente.toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default IndicadoresFinanceiros;
