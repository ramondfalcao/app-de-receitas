import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { useSelector, useDispatch } from 'react-redux';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { favoriteDrinksLocalStorage } from '../helpers/helpers';
import { callApiDrinkOfId } from '../redux/action/actionsAsysc';

export default function RecipeDrinksInProgress(props) {
  const { location: { pathname } } = props;
  const [favoriteButton, setFavoriteButton] = useState(false);
  const [messageLinkCopied, setMessageLinkCopied] = useState(false);
  const drinkId = (pathname.match(/([0-9])\w+/g))[0];
  const dispatch = useDispatch();
  const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const drink = useSelector((state) => state.drinksReducer.drink);

  console.log(drink);

  function linkCopied() {
    copy(`http://localhost:3000${pathname}`);
    setMessageLinkCopied(true);
    setTimeout(() => {
      setMessageLinkCopied(false);
    }, EXPOSURE_TIME);
  }

  useEffect(() => {
    setFavoriteButton(favorite && favorite.some(({ id }) => +drinkId === +id));
    dispatch(callApiDrinkOfId(drinkId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let ingredients = [];
  const itemsIngredients = Object.entries(drink);
  ingredients = itemsIngredients.filter((item) => item[0]
    .includes('strIngredient') && item[1]);

  let measures = [];
  const itemsMeasures = Object.entries(drink);
  measures = (itemsMeasures.filter((item) => item[0]
    .includes('strMeasure')));

  return (
    <main>
      <img
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
      />
      <h2 data-testid="recipe-title">{drink.strDrink}</h2>
      <button type="button" onClick={ linkCopied }>
        <img data-testid="share-btn" src={ shareIcon } alt="share-icon" />
      </button>
      <button
        type="button"
        onClick={ () => {
          favoriteDrinksLocalStorage(drink, 'drink');
          setFavoriteButton(!favoriteButton);
        } }
      >
        {(favoriteButton
          ? (
            <img
              data-testid="favorite-btn"
              src={ blackHeartIcon }
              alt="black-heart-icon"
            />
          )
          : (
            <img
              data-testid="favorite-btn"
              src={ whiteHeartIcon }
              alt="white-heart-icon"
            />)
        )}
      </button>
      {messageLinkCopied && <p>Link copied!</p>}
      <p data-testid="recipe-category">{drink.strCategory}</p>
      {ingredients.map((ingredient, index) => (
        <label key={ index } htmlFor={ `ingredient-${index}` }>
          <input
            id={ `ingredient-${index}` }
            name={ `ingredient-${index}` }
            type="checkbox"
            data-testid={ `${index}-ingredient-step` }
          />
          {measures[index][1]
            ? `${ingredient[1]} - ${measures[index][1]}` : ingredients[1]}
        </label>
      ))}
      <p data-testid="instructions">{drink.strInstructions}</p>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        className="btn-finish-recipe"
      >
        Finish Recipe
      </button>
    </main>
  );
}

RecipeDrinksInProgress.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
