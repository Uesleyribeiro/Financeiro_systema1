import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const [novaEmpresa, setNovaEmpresa] = useState({ nome: '', cnpj: '' });

  useEffect(() => {
    carregarEmpresas();
  }, []);

  const carregarEmpresas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/empresas');
      setEmpresas(response.data);
    } catch (error) {
      console.error('Erro ao carregar empresas:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/empresas', novaEmpresa);
      setNovaEmpresa({ nome: '', cnpj: '' });
      carregarEmpresas();
    } catch (error) {
      console.error('Erro ao criar empresa:', error);
    }
  };

  return (
    <div>
      <h2>Empresas</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome da Empresa"
          value={novaEmpresa.nome}
          onChange={(e) => setNovaEmpresa({ ...novaEmpresa, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="CNPJ"
          value={novaEmpresa.cnpj}
          onChange={(e) => setNovaEmpresa({ ...novaEmpresa, cnpj: e.target.value })}
        />
        <button type="submit">Adicionar Empresa</button>
      </form>
      <ul>
        {empresas.map((empresa) => (
          <li key={empresa.id}>{empresa.nome} - {empresa.cnpj}</li>
        ))}
      </ul>
    </div>
  );
}

export default Empresas;
