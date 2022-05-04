import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function CardFavoriteFood(props) {
  const { recipe, index, setFavoritesRecipes } = props;
  const [messageLinkCopied, setMessageLinkCopied] = useState(false);
  const EXPOSURE_TIME = 5000;
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  // const { tags } = recipe;

  function linkCopied() {
    copy(`http://localhost:3000/foods/${recipe.id}`);
    setMessageLinkCopied(true);
    setTimeout(() => {
      setMessageLinkCopied(false);
    }, EXPOSURE_TIME);
  }

  const handleClick = ({ target }) => {
    const { value } = target.parentNode;
    const newFavorites = favorites.filter(({ id }) => id !== value);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavoritesRecipes(newFavorites);
  };

  return (
    <div>
      <Link to={ `/foods/${recipe.id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
        />
      </Link>
      <Link to={ `/foods/${recipe.id}` }>
        <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
      </Link>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {`${recipe.nationality} - ${recipe.category} `}

      </p>
      <button
        type="button"
        onClick={ linkCopied }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="share-icon"
        />
      </button>
      <button
        value={ recipe.id }
        type="button"
        onClick={ handleClick }
      >

        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ blackHeartIcon }
          alt="black-heart-icon"
        />

      </button>
      {messageLinkCopied && <p>Link copied!</p>}
    </div>
  );
}

CardFavoriteFood.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  setFavoritesRecipes: PropTypes.func.isRequired,
};
