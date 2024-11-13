import React, { useState, useEffect } from 'react';
import CategoriaForm from '../components/CategoriaForm';
import CategoriaList from '../components/CategoriaList';
import { getCategorias } from '../services/api';
import { Categoria } from '../types';

const Categorias: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  return (
    <div>
      <h1>Categorias</h1>
      <CategoriaForm onCategoriaAdded={fetchCategorias} />
      <CategoriaList categorias={categorias} />
    </div>
  );
};

export default Categorias;
