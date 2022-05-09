import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import CardFavoriteDrinks from '../components/CardFavoriteDrinks';
import CardFavoriteFood from '../components/CardFavoriteFood';
import Header from '../components/Header';
import './FavoriteRecipes.css';

export default function FavoriteRecipes(props) {
  const { location } = props;
  const [favoritesRecipes, setFavoritesRecipes] = useState('');
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const filterFoods = () => {
    setFavoritesRecipes(favorites.filter((recipe) => recipe.type === 'food'));
  };

  const filterDrinks = () => {
    setFavoritesRecipes(favorites.filter((recipe) => recipe.type === 'drink'));
  };

  const filterAll = () => {
    setFavoritesRecipes(favorites);
  };

  useEffect(() => {
    setFavoritesRecipes(favorites);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header title="Favorite Recipes" search={ false } />
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
      <main className="main-favorites">
        {favoritesRecipes && favoritesRecipes.map((recipe, index) => (
          recipe.type === 'food'
            ? (
              <CardFavoriteFood
                key={ recipe.id }
                index={ index }
                recipe={ recipe }
                location={ location }
                setFavoritesRecipes={ setFavoritesRecipes }
              />
            )
            : (
              <CardFavoriteDrinks
                key={ recipe.id }
                index={ index }
                recipe={ recipe }
                location={ location }
                setFavoritesRecipes={ setFavoritesRecipes }
              />
            )
        )) }
      </main>
    </div>
  );
}

FavoriteRecipes.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
