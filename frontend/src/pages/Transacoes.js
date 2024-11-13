import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Transacoes() {
  const [transacoes, setTransacoes] = useState([]);
  const [novaTransacao, setNovaTransacao] = useState({
    empresa_id: '',
    plano_contas_id: '',
    data: '',
    valor: '',
    tipo: ''
  });

  useEffect(() => {
    carregarTransacoes();
  }, []);

  const carregarTransacoes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transacoes');
      setTransacoes(response.data);
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/transacoes', novaTransacao);
      setNovaTransacao({
        empresa_id: '',
        plano_contas_id: '',
        data: '',
        valor: '',
        tipo: ''
      });
      carregarTransacoes();
    } catch (error) {
      console.error('Erro ao criar transação:', error);
    }
  };

  return (
    <div>
      <h2>Transações</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="ID da Empresa"
          value={novaTransacao.empresa_id}
          onChange={(e) => setNovaTransacao({ ...novaTransacao, empresa_id: e.target.value })}
        />
        <input
          type="number"
          placeholder="ID do Plano de Contas"
          value={novaTransacao.plano_contas_id}
          onChange={(e) => setNovaTransacao({ ...novaTransacao, plano_contas_id: e.target.value })}
        />
        <input
          type="date"
          value={novaTransacao.data}
          onChange={(e) => setNovaTransacao({ ...novaTransacao, data: e.target.value })}
        />
        <input
          type="number"
          placeholder="Valor"
          value={novaTransacao.valor}
          onChange={(e) => setNovaTransacao({ ...novaTransacao, valor: e.target.value })}
        />
        <select
          value={novaTransacao.tipo}
          onChange={(e) => setNovaTransacao({ ...novaTransacao, tipo: e.target.value })}
        >
          <option value="">Selecione o tipo</option>
          <option value="R">Receita</option>
          <option value="D">Despesa</option>
        </select>
        <button type="submit">Adicionar Transação</button>
      </form>
      <ul>
        {transacoes.map((transacao) => (
          <li key={transacao.id}>
            {transacao.data} - R$ {transacao.valor} - {transacao.tipo === 'R' ? 'Receita' : 'Despesa'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transacoes;
