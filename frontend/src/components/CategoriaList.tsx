import React from 'react';
import { Categoria } from '../types';

interface CategoriaListProps {
  categorias: Categoria[];
}

const CategoriaList: React.FC<CategoriaListProps> = ({ categorias }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Tipo</th>
        </tr>
      </thead>
      <tbody>
        {categorias.map(categoria => (
          <tr key={categoria.id}>
            <td>{categoria.nome}</td>
            <td>{categoria.tipo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoriaList;
