import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Relatorios() {
  const [relatorios, setRelatorios] = useState({
    balanco: null,
    dre: null,
    fluxoCaixa: null
  });

  useEffect(() => {
    carregarRelatorios();
  }, []);

  const carregarRelatorios = async () => {
    try {
      const balanco = await axios.get('http://localhost:5000/api/relatorios/balanco');
      const dre = await axios.get('http://localhost:5000/api/relatorios/dre');
      const fluxoCaixa = await axios.get('http://localhost:5000/api/relatorios/fluxo-caixa');

      setRelatorios({
        balanco: balanco.data,
        dre: dre.data,
        fluxoCaixa: fluxoCaixa.data
      });
    } catch (error) {
      console.error('Erro ao carregar relatórios:', error);
    }
  };

  return (
    <div>
      <h2>Relatórios Financeiros</h2>

      <h3>Balanço Patrimonial</h3>
      {relatorios.balanco && (
        <pre>{JSON.stringify(relatorios.balanco, null, 2)}</pre>
      )}

      <h3>Demonstração do Resultado do Exercício (DRE)</h3>
      {relatorios.dre && (
        <pre>{JSON.stringify(relatorios.dre, null, 2)}</pre>
      )}

      <h3>Fluxo de Caixa</h3>
      {relatorios.fluxoCaixa && (
        <pre>{JSON.stringify(relatorios.fluxoCaixa, null, 2)}</pre>
      )}
    </div>
  );
}

export default Relatorios;
