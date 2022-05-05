import PropTypes from 'prop-types';
import React, { useState } from 'react';
import CardDonesDrinks from '../components/CardDonesDrinks';
import CardDonesFoods from '../components/CardDonesFoods';
import Header from '../components/Header';

export default function DoneRecipes(props) {
  const { location } = props;
  const done = JSON.parse(localStorage.getItem('doneRecipes'));
  const [doneRecipes, setDoneRecipes] = useState(done);

  const filterFoods = () => {
    setDoneRecipes(done.filter((recipe) => recipe.type === 'comida'));
  };

  const filterDrinks = () => {
    setDoneRecipes(done.filter((recipe) => recipe.type === 'bebida'));
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
        recipe.type === 'comida'
          ? (
            <CardDonesFoods
              key={ recipe.id }
              index={ index }
              recipe={ recipe }
              location={ location }
            />
          )
          : (
            <CardDonesDrinks
              key={ recipe.id }
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
