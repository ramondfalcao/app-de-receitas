import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

export default function CardDonesDrinks(props) {
  const { location: { pathname }, recipe, index } = props;
  const EXPOSURE_TIME = 5000;
  function linkCopied() {
    copy(`http://localhost:3000${pathname}`);
    setMessageLinkCopied(true);
    setTimeout(() => {
      setMessageLinkCopied(false);
    }, EXPOSURE_TIME);
  }
  return (
    <div>
      <Link to={ `/drinks/${recipe.idDrink}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.thumbnail }
          alt={ recipe.name }
        />
        <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
      <p>{recipe.alcool}</p>
      <button
        type="button"
        onClick={ linkCopied }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn"` }
          src={ shareIcon }
          alt="share-icon"
        />
      </button>
    </div>
  );
}

CardDonesDrinks.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
