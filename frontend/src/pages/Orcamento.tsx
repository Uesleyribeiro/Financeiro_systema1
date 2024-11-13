import React from 'react';
import OrcamentoForm from '../components/OrcamentoForm';
import ComparativoOrcamento from '../components/ComparativoOrcamento';

const Orcamento: React.FC = () => {
  return (
    <div>
      <h1>Orçamento</h1>
      <OrcamentoForm />
      <ComparativoOrcamento />
    </div>
  );
};

export default Orcamento;
