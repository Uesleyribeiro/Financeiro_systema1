import React, { useState, useEffect } from 'react';
import { getRentabilidade } from '../services/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const RentabilidadeAnalise: React.FC = () => {
  const [rentabilidade, setRentabilidade] = useState<any[]>([]);
  const [dataInicio, setDataInicio] = useState<string>('');
  const [dataFim, setDataFim] = useState<string>('');

  useEffect(() => {
    if (dataInicio && dataFim) {
      fetchRentabilidade();
    }
  }, [dataInicio, dataFim]);

  const fetchRentabilidade = async () => {
    try {
      const data = await getRentabilidade(dataInicio, dataFim);
      setRentabilidade(data);
    } catch (error) {
      console.error('Erro ao buscar rentabilidade:', error);
    }
  };

  return (
    <div>
      <h2>Análise de Rentabilidade</h2>
      <input
        type="date"
        value={dataInicio}
        onChange={(e) => setDataInicio(e.target.value)}
      />
      <input
        type="date"
        value={dataFim}
        onChange={(e) => setDataFim(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Produto</TableCell>
              <TableCell align="right">Vendas</TableCell>
              <TableCell align="right">Custos</TableCell>
              <TableCell align="right">Lucro</TableCell>
              <TableCell align="right">Margem (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rentabilidade.map((item) => (
              <TableRow key={item.produto}>
                <TableCell component="th" scope="row">
                  {item.produto}
                </TableCell>
                <TableCell align="right">{item.vendas.toFixed(2)}</TableCell>
                <TableCell align="right">{item.custos.toFixed(2)}</TableCell>
                <TableCell align="right">{item.lucro.toFixed(2)}</TableCell>
                <TableCell align="right">{item.margem.toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RentabilidadeAnalise;
