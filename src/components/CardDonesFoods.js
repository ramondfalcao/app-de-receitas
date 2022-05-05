import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

export default function CardDonesFoods(props) {
  const { location: { pathname }, recipe, index } = props;
  function linkCopied() {
    copy(`http://localhost:3000${pathname}`);
    setMessageLinkCopied(true);
    setTimeout(() => {
      setMessageLinkCopied(false);
    }, EXPOSURE_TIME);
  }
  return (
    <div>
      <Link to={ `/foods/${recipe.idMeal}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.thumbnail }
          alt={ recipe.name }
        />
        <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>{ recipe.category }</p>
      <p>{ recipe.nacionality }</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
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
      <p
        data-testid={ `${index}-${recipe.firstTag}-horizontal-tag` }
      >
        {recipe.firstTag}
      </p>
      <p
        data-testid={ `${index}-${recipe.secondTag}-horizontal-tag` }
      >
        {recipe.secondTag}
      </p>
    </div>
  );
}

CardDonesFoods.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
