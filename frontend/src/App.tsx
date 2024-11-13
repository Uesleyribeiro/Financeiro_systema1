import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Lancamentos from './pages/Lancamentos';
import Categorias from './pages/Categorias';
import CentrosCusto from './pages/CentrosCusto';
import Relatorios from './pages/Relatorios';
import Orcamento from './pages/Orcamento';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/lancamentos" component={Lancamentos} />
          <Route path="/categorias" component={Categorias} />
          <Route path="/centros-custo" component={CentrosCusto} />
          <Route path="/relatorios" component={Relatorios} />
          <Route path="/orcamento" component={Orcamento} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
