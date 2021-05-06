import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import Movie from './SingleMovie'

function App() {
  // Como o router está no index agora, nós precisamos começar o App com o componente Switch
  return <Switch>
    <Route path='/' exact>
      <Home />
    </Route>
    <Route path='/movies/:id' children={<Movie/>}/>
  </Switch>
}

export default App
