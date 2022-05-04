import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import CardDonesDrinks from '../components/CardDonesDrinks';
import CardDonesFoods from '../components/CardDonesFoods';

export default function DoneRecipes(props) {
  const { location } = props;
  const done = JSON.parse(localStorage.getItem('doneRecipes'));
  const [doneRecipes, setDoneRecipes] = useState(done);

  const filterFoods = () => {
    setDoneRecipes(done.filter((recipe) => recipe.type === 'foods'));
  };

  const filterDrinks = () => {
    setDoneRecipes(done.filter((recipe) => recipe.type === 'drinks'));
  };

  const filterAll = () => {
    setDoneRecipes(done);
  };

  return (
    <div>
      <Header title="Done Recipes" search={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ filterAll }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ filterFoods }
      >
        Foods
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterDrinks }
      >
        Drinks
      </button>
      {doneRecipes && doneRecipes.map((recipe, index) => (
        recipe.type === 'food'
          ? (
            <CardDonesFoods
              key={ recipe.idMeal }
              index={ index }
              recipe={ recipe }
              location={ location }
            />
          )
          : (
            <CardDonesDrinks
              key={ recipe.idDrink }
              index={ index }
              recipe={ recipe }
              location={ location }
            />
          )
      )) }
    </div>
  );
}

DoneRecipes.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
