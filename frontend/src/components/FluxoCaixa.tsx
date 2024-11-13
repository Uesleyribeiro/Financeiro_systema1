import React, { useState, useEffect } from 'react';
import { getFluxoCaixa } from '../services/api';

interface FluxoCaixaProps {
  dataInicio: string;
  dataFim: string;
}

interface FluxoCaixaData {
  saldoInicial: number;
  entradas: number;
  saidas: number;
  saldoFinal: number;
}

const FluxoCaixa: React.FC<FluxoCaixaProps> = ({ dataInicio, dataFim }) => {
  const [fluxoCaixaData, setFluxoCaixaData] = useState<FluxoCaixaData | null>(null);

  useEffect(() => {
    if (dataInicio && dataFim) {
      fetchFluxoCaixa();
    }
  }, [dataInicio, dataFim]);

  const fetchFluxoCaixa = async () => {
    try {
      const data = await getFluxoCaixa(dataInicio, dataFim);
      setFluxoCaixaData(data);
    } catch (error) {
      console.error('Erro ao buscar Fluxo de Caixa:', error);
    }
  };

  if (!fluxoCaixaData) return <div>Carregando Fluxo de Caixa...</div>;

  return (
    <div>
      <h2>Fluxo de Caixa</h2>
      <table>
        <tbody>
          <tr>
            <td>Saldo Inicial</td>
            <td>R$ {fluxoCaixaData.saldoInicial.toFixed(2)}</td>
          </tr>
          <tr>
            <td>(+) Entradas</td>
            <td>R$ {fluxoCaixaData.entradas.toFixed(2)}</td>
          </tr>
          <tr>
            <td>(-) Saídas</td>
            <td>R$ {fluxoCaixaData.saidas.toFixed(2)}</td>
          </tr>
          <tr>
            <td><strong>Saldo Final</strong></td>
            <td><strong>R$ {fluxoCaixaData.saldoFinal.toFixed(2)}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FluxoCaixa;
