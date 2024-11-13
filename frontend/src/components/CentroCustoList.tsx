import React from 'react';
import { CentroCusto } from '../types';

interface CentroCustoListProps {
  centrosCusto: CentroCusto[];
  onDelete: (id: number) => void;
}

const CentroCustoList: React.FC<CentroCustoListProps> = ({ centrosCusto, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Ativo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {centrosCusto.map(centroCusto => (
          <tr key={centroCusto.id}>
            <td>{centroCusto.nome}</td>
            <td>{centroCusto.descricao}</td>
            <td>{centroCusto.ativo ? 'Sim' : 'Não'}</td>
            <td>
              <button onClick={() => onDelete(centroCusto.id!)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CentroCustoList;
