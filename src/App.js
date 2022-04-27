import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import './App.css';
import { requestFirstLetter } from './services/ApiMeals';

function App() {
  requestFirstLetter('a').then((e) => console.log(e));

  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods" component={ Foods } />
    </Switch>
  );
}

export default App;
