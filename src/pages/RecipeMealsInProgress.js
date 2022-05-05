import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import {
  doneRecipesMeals,
  favoriteMealsLocalStorage,
  inProgressRecipesMeals,
} from '../helpers/helpers';
import { callApiFoodsOfId } from '../redux/action/actionsAsysc';

const EXPOSURE_TIME = 5000;
export default function RecipeMealsInProgress(props) {
  const { location: { pathname } } = props;
  const [favoriteButton, setFavoriteButton] = useState(false);
  const [messageLinkCopied, setMessageLinkCopied] = useState(false);
  const [inProgress, setInProgress] = useState('');
  const mealId = (pathname.match(/([0-9])\w+/g))[0];
  const dispatch = useDispatch();
  const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const meal = useSelector((state) => state.mealsReducer.meal);
  const history = useHistory();

  const haveRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!haveRecipe.meals[mealId]) {
    haveRecipe.meals[mealId] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(haveRecipe));
  }

  let ingredients = [];
  const itemsIngredients = Object.entries(meal);
  ingredients = itemsIngredients.filter((item) => item[0]
    .includes('strIngredient') && item[1]);

  let measures = [];
  const itemsMeasures = Object.entries(meal);
  measures = (itemsMeasures.filter((item) => item[0]
    .includes('strMeasure') && item[1]));

  function linkCopied() {
    copy(`http://localhost:3000/foods/${mealId}`);
    setMessageLinkCopied(true);
    setTimeout(() => {
      setMessageLinkCopied(false);
    }, EXPOSURE_TIME);
  }

  function handleCheckbox({ target }) {
    const newInProgress = inProgressRecipesMeals(mealId, target.value);
    setInProgress(newInProgress.meals[mealId]);
  }

  function handleClickFinish() {
    doneRecipesMeals(meal);
    history.push('/done-recipes');
  }

  useEffect(() => {
    setFavoriteButton(favorite && favorite.some(({ id }) => +mealId === +id));
    dispatch(callApiFoodsOfId(mealId));
    const newInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setInProgress(newInProgress.meals[mealId]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <img
        data-testid="recipe-photo"
        src={ meal.strMealThumb }
        alt={ meal.strMeal }
      />
      <h2 data-testid="recipe-title">{meal.strMeal}</h2>
      <button type="button" onClick={ linkCopied }>
        <img data-testid="share-btn" src={ shareIcon } alt="share-icon" />
      </button>
      <button
        type="button"
        onClick={ () => {
          favoriteMealsLocalStorage(meal, 'food');
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
      <p data-testid="recipe-category">{meal.strCategory}</p>
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
          {`${ingredient[1]} - ${measures[index][1]}`}
        </label>
      ))}
      <p data-testid="instructions">{meal.strInstructions}</p>
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

RecipeMealsInProgress.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
