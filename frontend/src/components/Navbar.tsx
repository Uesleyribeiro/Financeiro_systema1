import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/empresas">Empresas</Link></li>
        <li><Link to="/plano-contas">Plano de Contas</Link></li>
        <li><Link to="/transacoes">Transações</Link></li>
        <li><Link to="/relatorios">Relatórios</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
