import React, { useState, useEffect } from 'react';
import { criarOrcamento, obterCategorias } from '../services/api';

const OrcamentoForm: React.FC = () => {
  const [ano, setAno] = useState<number>(new Date().getFullYear());
  const [mes, setMes] = useState<number>(new Date().getMonth() + 1);
  const [categoriaId, setCategoriaId] = useState<number>(0);
  const [valorPrevisto, setValorPrevisto] = useState<number>(0);
  const [categorias, setCategorias] = useState<any[]>([]);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const data = await obterCategorias();
      setCategorias(data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await criarOrcamento({ ano, mes, categoria_id: categoriaId, valor_previsto: valorPrevisto });
      alert('Orçamento criado com sucesso!');
      // Limpar o formulário ou redirecionar
    } catch (error) {
      console.error('Erro ao criar orçamento:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={ano} onChange={(e) => setAno(Number(e.target.value))} placeholder="Ano" required />
      <input type="number" value={mes} onChange={(e) => setMes(Number(e.target.value))} placeholder="Mês" min="1" max="12" required />
      <select value={categoriaId} onChange={(e) => setCategoriaId(Number(e.target.value))} required>
        <option value="">Selecione uma categoria</option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.nome}</option>
        ))}
      </select>
      <input type="number" value={valorPrevisto} onChange={(e) => setValorPrevisto(Number(e.target.value))} placeholder="Valor Previsto" required />
      <button type="submit">Criar Orçamento</button>
    </form>
  );
};

export default OrcamentoForm;
