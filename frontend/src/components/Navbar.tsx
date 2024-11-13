import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/lancamentos">Lançamentos</Link></li>
        <li><Link to="/categorias">Categorias</Link></li>
        <li><Link to="/centros-custo">Centros de Custo</Link></li>
        <li><Link to="/relatorios">Relatórios</Link></li>
        <li><Link to="/orcamento">Orçamento</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;