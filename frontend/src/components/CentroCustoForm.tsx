import React, { useState } from 'react';
import { createCentroCusto } from '../services/api';
import { CentroCusto } from '../types';

interface CentroCustoFormProps {
  onCentroCustoAdded: () => void;
}

const CentroCustoForm: React.FC<CentroCustoFormProps> = ({ onCentroCustoAdded }) => {
  const [centroCusto, setCentroCusto] = useState<Partial<CentroCusto>>({
    nome: '',
    descricao: '',
    ativo: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setCentroCusto(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCentroCusto(centroCusto as CentroCusto);
      onCentroCustoAdded();
      setCentroCusto({ nome: '', descricao: '', ativo: true });
    } catch (error) {
      console.error('Erro ao criar centro de custo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nome"
        value={centroCusto.nome}
        onChange={handleChange}
        placeholder="Nome do Centro de Custo"
        required
      />
      <textarea
        name="descricao"
        value={centroCusto.descricao}
        onChange={handleChange}
        placeholder="Descrição"
      />
      <label>
        <input
          type="checkbox"
          name="ativo"
          checked={centroCusto.ativo}
          onChange={handleChange}
        />
        Ativo
      </label>
      <button type="submit">Adicionar Centro de Custo</button>
    </form>
  );
};

export default CentroCustoForm;
