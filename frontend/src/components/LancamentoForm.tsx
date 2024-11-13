import React, { useState } from 'react';
import { createLancamento } from '../services/api';
import { Lancamento } from '../types';

interface LancamentoFormProps {
  onLancamentoAdded: () => void;
}

const LancamentoForm: React.FC<LancamentoFormProps> = ({ onLancamentoAdded }) => {
  const [lancamento, setLancamento] = useState<Partial<Lancamento>>({
    data: '',
    descricao: '',
    valor: 0,
    tipo: '',
    categoria: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLancamento(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLancamento(lancamento as Lancamento);
      onLancamentoAdded();
      setLancamento({
        data: '',
        descricao: '',
        valor: 0,
        tipo: '',
        categoria: '',
      });
    } catch (error) {
      console.error('Erro ao criar lançamento:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        name="data"
        value={lancamento.data}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="descricao"
        value={lancamento.descricao}
        onChange={handleChange}
        placeholder="Descrição"
        required
      />
      <input
        type="number"
        name="valor"
        value={lancamento.valor}
        onChange={handleChange}
        placeholder="Valor"
        required
      />
      <select
        name="tipo"
        value={lancamento.tipo}
        onChange={handleChange}
        required
      >
        <option value="">Selecione o tipo</option>
        <option value="Receita">Receita</option>
        <option value="Despesa">Despesa</option>
      </select>
      <input
        type="text"
        name="categoria"
        value={lancamento.categoria}
        onChange={handleChange}
        placeholder="Categoria"
        required
      />
      <button type="submit">Adicionar Lançamento</button>
    </form>
  );
};

export default LancamentoForm;
