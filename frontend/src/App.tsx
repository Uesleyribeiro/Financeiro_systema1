import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Empresas from './pages/Empresas';
import PlanoContas from './pages/PlanoContas';
import Transacoes from './pages/Transacoes';
import Relatorios from './pages/Relatorios';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/empresas" component={Empresas} />
          <Route path="/plano-contas" component={PlanoContas} />
          <Route path="/transacoes" component={Transacoes} />
          <Route path="/relatorios" component={Relatorios} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
