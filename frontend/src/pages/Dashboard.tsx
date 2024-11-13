import React, { useState, useEffect } from 'react';
import { getDashboardData } from '../services/api';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ResumoFinanceiro from '../components/ResumoFinanceiro';
import EvolucaoReceitas from '../components/EvolucaoReceitas';
import TopDespesas from '../components/TopDespesas';
import IndicadoresFinanceiros from '../components/IndicadoresFinanceiros';
import LancamentoForm from '../components/LancamentoForm';
import LancamentoList from '../components/LancamentoList';
import RelatorioFluxoCaixa from '../components/RelatorioFluxoCaixa';
import RelatorioDRE from '../components/RelatorioDRE';
import { getLancamentos } from '../services/api';
import { Lancamento } from '../types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);

  useEffect(() => {
    const fetchLancamentos = async () => {
      try {
        const data = await getLancamentos();
        setLancamentos(data);
      } catch (error) {
        console.error('Erro ao buscar lançamentos:', error);
      }
    };
    fetchLancamentos();
  }, []);

    useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await getDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error);
    }
  };

  if (!dashboardData) {
    return <Typography>Carregando...</Typography>;
  }


return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Dashboard Financeiro
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <ResumoFinanceiro data={dashboardData.resumo} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <IndicadoresFinanceiros data={dashboardData.indicadores} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <EvolucaoReceitas data={dashboardData.evolucao} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <TopDespesas data={dashboardData.topDespesas} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
