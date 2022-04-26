import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';
import { requestFirstLetter } from './services/ApiMeals';

function App() {
  requestFirstLetter('a').then((e) => console.log(e));

  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/home" component={ Home } />
    </Switch>
  );
}

export default App;
