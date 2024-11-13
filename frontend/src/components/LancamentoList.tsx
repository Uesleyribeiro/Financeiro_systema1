import React from 'react';
import { Lancamento } from '../types';

interface LancamentoListProps {
  lancamentos: Lancamento[];
}

const LancamentoList: React.FC<LancamentoListProps> = ({ lancamentos }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Data</th>
          <th>Descrição</th>
          <th>Valor</th>
          <th>Tipo</th>
          <th>Categoria</th>
        </tr>
      </thead>
      <tbody>
        {lancamentos.map(lancamento => (
          <tr key={lancamento.id}>
            <td>{lancamento.data}</td>
            <td>{lancamento.descricao}</td>
            <td>{lancamento.valor}</td>
            <td>{lancamento.tipo}</td>
            <td>{lancamento.categoria}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LancamentoList;
