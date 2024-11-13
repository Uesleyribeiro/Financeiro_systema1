import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PlanoContas() {
  const [planoContas, setPlanoContas] = useState([]);
  const [novoPlano, setNovoPlano] = useState({ empresa_id: '', codigo: '', descricao: '' });

  useEffect(() => {
    carregarPlanoContas();
  }, []);

  const carregarPlanoContas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/plano-contas');
      setPlanoContas(response.data);
    } catch (error) {
      console.error('Erro ao carregar plano de contas:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/plano-contas', novoPlano);
      setNovoPlano({ empresa_id: '', codigo: '', descricao: '' });
      carregarPlanoContas();
    } catch (error) {
      console.error('Erro ao criar plano de contas:', error);
    }
  };

  return (
    <div>
      <h2>Plano de Contas</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="ID da Empresa"
          value={novoPlano.empresa_id}
          onChange={(e) => setNovoPlano({ ...novoPlano, empresa_id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Código"
          value={novoPlano.codigo}
          onChange={(e) => setNovoPlano({ ...novoPlano, codigo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={novoPlano.descricao}
          onChange={(e) => setNovoPlano({ ...novoPlano, descricao: e.target.value })}
        />
        <button type="submit">Adicionar Plano de Contas</button>
      </form>
      <ul>
        {planoContas.map((plano) => (
          <li key={plano.id}>{plano.codigo} - {plano.descricao}</li>
        ))}
      </ul>
    </div>
  );
}

export default PlanoContas;
