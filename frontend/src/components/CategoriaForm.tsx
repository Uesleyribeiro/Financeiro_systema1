import React, { useState } from 'react';
import { createCategoria } from '../services/api';
import { Categoria } from '../types';

interface CategoriaFormProps {
  onCategoriaAdded: () => void;
}

const CategoriaForm: React.FC<CategoriaFormProps> = ({ onCategoriaAdded }) => {
  const [categoria, setCategoria] = useState<Partial<Categoria>>({
    nome: '',
    tipo: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCategoria(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCategoria(categoria as Categoria);
      onCategoriaAdded();
      setCategoria({ nome: '', tipo: '' });
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nome"
        value={categoria.nome}
        onChange={handleChange}
        placeholder="Nome da Categoria"
        required
      />
      <select
        name="tipo"
        value={categoria.tipo}
        onChange={handleChange}
        required
      >
        <option value="">Selecione o tipo</option>
        <option value="Receita">Receita</option>
        <option value="Despesa">Despesa</option>
      </select>
      <button type="submit">Adicionar Categoria</button>
    </form>
  );
};

export default CategoriaForm;
