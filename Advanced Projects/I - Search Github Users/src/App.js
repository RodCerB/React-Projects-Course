import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    // Vamos começar nosso projeto com o básico do uso do router, que é encapsular todo o projeto dentro do BrowserRouter e depois definindo separadamente cada Route
    <Router>
      <Switch>
        <Route path='/' exact={true}>
          <Dashboard />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        {/* O Error nós usamos o path como '*', que quer dizer que ele vai dar match com qualquer caminho que escreverem. Mas ai ele vai aparecer na home, no login etc. Para resolver isso usamos o Switch encapsulando tudo dentro do Router. Isso pq o Switch ele renderiza o primeiro Route que  dá match com o caminho. E por isso o Route do Error deve vir por último no Router*/}
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
