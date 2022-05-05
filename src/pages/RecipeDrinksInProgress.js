import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import {
  doneRecipesDrinks,
  favoriteDrinksLocalStorage,
  inProgressRecipesDrinks,
} from '../helpers/helpers';
import { callApiDrinkOfId } from '../redux/action/actionsAsysc';

const EXPOSURE_TIME = 5000;

export default function RecipeDrinksInProgress(props) {
  const { location: { pathname } } = props;
  const [favoriteButton, setFavoriteButton] = useState(false);
  const [messageLinkCopied, setMessageLinkCopied] = useState(false);
  const [inProgress, setInProgress] = useState('');
  const drinkId = (pathname.match(/([0-9])\w+/g))[0];
  const dispatch = useDispatch();
  const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const drink = useSelector((state) => state.drinksReducer.drink);
  const history = useHistory();

  const haveRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!haveRecipe.cocktails[drinkId]) {
    haveRecipe.cocktails[drinkId] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(haveRecipe));
  }

  let ingredients = [];
  const itemsIngredients = Object.entries(drink);
  ingredients = itemsIngredients.filter((item) => item[0]
    .includes('strIngredient') && item[1]);

  let measures = [];
  const itemsMeasures = Object.entries(drink);
  measures = (itemsMeasures.filter((item) => item[0]
    .includes('strMeasure')));

  function linkCopied() {
    copy(`http://localhost:3000/drinks/${drinkId}`);
    setMessageLinkCopied(true);
    setTimeout(() => {
      setMessageLinkCopied(false);
    }, EXPOSURE_TIME);
  }

  function handleCheckbox({ target }) {
    const newInProgress = inProgressRecipesDrinks(drinkId, target.value);
    setInProgress(newInProgress.cocktails[drinkId]);
  }

  function handleClickFinish() {
    doneRecipesDrinks(drink);
    history.push('/done-recipes');
  }

  useEffect(() => {
    setFavoriteButton(favorite && favorite.some(({ id }) => +drinkId === +id));
    dispatch(callApiDrinkOfId(drinkId));
    const newInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setInProgress(newInProgress.cocktails[drinkId]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <label
          key={ index }
          data-testid={ `${index}-ingredient-step` }
          htmlFor={ `ingredient-${index}` }
        >
          <input
            id={ `ingredient-${index}` }
            name={ `ingredient-${index}` }
            type="checkbox"
            value={ `${ingredient[1]} - ${measures[index][1]}` }
            checked={ inProgress
              .includes(`${ingredient[1]} - ${measures[index][1]}`) }
            onChange={ handleCheckbox }
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
        onClick={ handleClickFinish }
        disabled={ inProgress && (inProgress
          .length !== ingredients.length) }
      >
        Finish Recipe
      </button>
    </main>
  );
}

RecipeDrinksInProgress.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
