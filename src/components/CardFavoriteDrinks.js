import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './CardFavorite.css';

export default function CardFavoriteDrinks(props) {
  const { recipe, index, setFavoritesRecipes } = props;
  const [messageLinkCopied, setMessageLinkCopied] = useState(false);
  const EXPOSURE_TIME = 5000;
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));

  function linkCopied() {
    copy(`http://localhost:3000/drinks/${recipe.id}`);
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
    <div className="main-card-favorite">
      <main className="cardFavorite">
        <Link to={ `/drinks/${recipe.id}` }>
          <img
            style={ { width: '120px' } }
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
        </Link>
        <div className="container-details">
          <Link to={ `/drinks/${recipe.id}` }>
            <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>{recipe.alcoholicOrNot }</p>
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
        </div>
      </main>
      {messageLinkCopied && <p>Link copied!</p>}
    </div>
  );
}

CardFavoriteDrinks.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  setFavoritesRecipes: PropTypes.func.isRequired,
};
