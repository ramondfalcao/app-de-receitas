import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import './App.css';
import Drinks from './pages/Drinks';
import DetailsMeals from './pages/DetailsMeals';
import DetailsDrinks from './pages/DetailsDrinks';
import ExploreMeals from './pages/ExploreMeals';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreMealsIngredients from './pages/ExploreMealsIngredients';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreMealsNationality from './pages/ExploreMealsNationality';
import DoneRecipes from './pages/DoneRecipes';
import RecipeMealsInProgress from './pages/RecipeMealsInProgress';
import RecipeDrinksInProgress from './pages/RecipeDrinksInProgress';

function App() {
  function createLocalStorageInProgressAndDone() {
    const inProgress = localStorage.getItem('inProgressRecipes');
    if (!inProgress) {
      const object = { cocktails: {}, meals: {} };
      localStorage.setItem('inProgressRecipes', JSON.stringify(object));
    }
    const done = localStorage.getItem('doneRecipes');
    if (!done) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
  }

  createLocalStorageInProgressAndDone();

  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/foods/:id" component={ DetailsMeals } />
      <Route exact path="/foods/:id/in-progress" component={ RecipeMealsInProgress } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/drinks/:id" component={ DetailsDrinks } />
      <Route exact path="/drinks/:id/in-progress" component={ RecipeDrinksInProgress } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreMeals } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
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
    </Switch>
  );
}

export default App;
