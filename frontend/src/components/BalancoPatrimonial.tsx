import React, { useState, useEffect } from 'react';
import { getBalancoPatrimonial } from '../services/api';

const BalancoPatrimonial: React.FC = () => {
  const [balanco, setBalanco] = useState<any>(null);
  const [data, setData] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchBalanco();
  }, [data]);

  const fetchBalanco = async () => {
    try {
      const balancoData = await getBalancoPatrimonial(data);
      setBalanco(balancoData);
    } catch (error) {
      console.error('Erro ao buscar balanço patrimonial:', error);
    }
  };

  if (!balanco) return <div>Carregando...</div>;

  return (
    <div>
      <h2>Balanço Patrimonial</h2>
      <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h3>Ativo</h3>
          <p>Disponibilidades: R$ {balanco.ativo.disponibilidades.toFixed(2)}</p>
          <p>Contas a Receber: R$ {balanco.ativo.contas_receber.toFixed(2)}</p>
          <p><strong>Total Ativo: R$ {balanco.ativo.total_ativo.toFixed(2)}</strong></p>
        </div>
        <div>
          <h3>Passivo</h3>
          <p>Contas a Pagar: R$ {balanco.passivo.contas_pagar.toFixed(2)}</p>
          <p>Patrimônio Líquido: R$ {balanco.passivo.patrimonio_liquido.toFixed(2)}</p>
          <p><strong>Total Passivo: R$ {balanco.passivo.total_passivo.toFixed(2)}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default BalancoPatrimonial;
