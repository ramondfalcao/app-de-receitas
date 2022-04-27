import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import FavoriteRecipes from './pages/FavoriteRecipes';
import ContinueRecipes from './pages/ContinueRecipes';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import './App.css';
import { requestFirstLetter } from './services/ApiMeals';
import Drinks from './pages/Drinks';
import DetailsMeals from './pages/DetailsMeals';
import ExploreMeals from './pages/ExploreMeals';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreMealsIngredients from './pages/ExploreMealsIngredients';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreMealsNationality from './pages/ExploreMealsNationality';
import DoneRecipes from './pages/DoneRecipes';

function App() {
  requestFirstLetter('a').then((e) => console.log(e));

  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/foods:id" component={ DetailsMeals } />
      <Route exact path="/foods:id/in-progress" component={ ContinueRecipes } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreMeals } />
      <Route
        exact
        path="/explore/foods/ingredients"
        component={ ExploreMealsIngredients }
      />
      <Route
        exact
        path="/explore/drinks/ingredients"
        component={ ExploreDrinksIngredients }
      />
      <Route
        exact
        path="/explore/foods/nationalities"
        component={ ExploreMealsNationality }
      />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
    </Switch>
  );
}

export default App;
