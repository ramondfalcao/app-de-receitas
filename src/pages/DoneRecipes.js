import React, { useState } from 'react';
import CardDonesDrinks from '../components/CardDonesDrinks';
import CardDonesFoods from '../components/CardDonesFoods';
import Header from '../components/Header';
import './DoneRecipes.css';

export default function DoneRecipes() {
  const done = JSON.parse(localStorage.getItem('doneRecipes'));
  const [doneRecipes, setDoneRecipes] = useState(done);

  const filterFoods = () => {
    setDoneRecipes(done.filter((recipe) => recipe.type === 'food'));
  };

  const filterDrinks = () => {
    setDoneRecipes(done.filter((recipe) => recipe.type === 'drink'));
  };

  const filterAll = () => {
    setDoneRecipes(done);
  };

  return (
    <div>
      <Header title="Done Recipes" search={ false } />
      <section className="section-buttons-filter">
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
      </section>
      <main className="main-doneRecipes">
        {doneRecipes && doneRecipes.map((recipe, index) => (
          recipe.type === 'food'
            ? (
              <CardDonesFoods
                key={ recipe.id }
                index={ index }
                recipe={ recipe }
              />
            )
            : (
              <CardDonesDrinks
                key={ recipe.id }
                index={ index }
                recipe={ recipe }
              />
            )
        )) }
      </main>
    </div>
  );
}
