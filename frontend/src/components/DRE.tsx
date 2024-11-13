import React, { useState, useEffect } from 'react';
import { getDRE } from '../services/api';

interface DREProps {
  dataInicio: string;
  dataFim: string;
}

interface DREData {
  receitas: number;
  custos: number;
  despesas: number;
  resultado: number;
}

const DRE: React.FC<DREProps> = ({ dataInicio, dataFim }) => {
  const [dreData, setDREData] = useState<DREData | null>(null);

  useEffect(() => {
    if (dataInicio && dataFim) {
      fetchDRE();
    }
  }, [dataInicio, dataFim]);

  const fetchDRE = async () => {
    try {
      const data = await getDRE(dataInicio, dataFim);
      setDREData(data);
    } catch (error) {
      console.error('Erro ao buscar DRE:', error);
    }
  };

  if (!dreData) return <div>Carregando DRE...</div>;

  return (
    <div>
      <h2>Demonstração do Resultado do Exercício (DRE)</h2>
      <table>
        <tbody>
          <tr>
            <td>Receitas</td>
            <td>R$ {dreData.receitas.toFixed(2)}</td>
          </tr>
          <tr>
            <td>(-) Custos</td>
            <td>R$ {dreData.custos.toFixed(2)}</td>
          </tr>
          <tr>
            <td>(-) Despesas</td>
            <td>R$ {dreData.despesas.toFixed(2)}</td>
          </tr>
          <tr>
            <td><strong>Resultado</strong></td>
            <td><strong>R$ {dreData.resultado.toFixed(2)}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DRE;
