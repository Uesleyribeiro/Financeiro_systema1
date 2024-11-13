import React from 'react';
import DRE from '../components/DRE';
import FluxoCaixa from '../components/FluxoCaixa';
import BalancoPatrimonial from '../components/BalancoPatrimonial';
import FluxoCaixaProjetado from '../components/FluxoCaixaProjetado';
import RentabilidadeAnalise from '../components/RentabilidadeAnalise';
import ProjecaoFinanceira from '../components/ProjecaoFinanceira';

const Relatorios: React.FC = () => {
  return (
    <div>
      <h1>Relatórios</h1>
      <DRE />
      <FluxoCaixa />
      <BalancoPatrimonial />
      <FluxoCaixaProjetado />
      <RentabilidadeAnalise />
      <ProjecaoFinanceira />
    </div>
  );
};

export default Relatorios;
