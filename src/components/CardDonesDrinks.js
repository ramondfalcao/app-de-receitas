import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

export default function CardDonesDrinks(props) {
  const { recipe, index } = props;
  const [messageLinkCopied, setMessageLinkCopied] = useState(false);
  const EXPOSURE_TIME = 5000;
  function linkCopied() {
    copy(`http://localhost:3000/drinks/${recipe.id}`);
    setMessageLinkCopied(true);
    setTimeout(() => {
      setMessageLinkCopied(false);
    }, EXPOSURE_TIME);
  }
  return (
    <div>
      <Link to={ `/drinks/${recipe.id}` }>
        <img
          style={ { width: '120px' } }
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
        />
        <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
      </Link>
      <div>
        <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          {recipe.alcoholicOrNot}
        </p>
      </div>
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
      {messageLinkCopied && <p>Link copied!</p>}
    </div>
  );
}

CardDonesDrinks.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
