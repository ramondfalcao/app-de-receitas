/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import {
  doneRecipesMeals,
  favoriteMealsLocalStorage,
  inProgressRecipesMeals,
} from '../helpers/helpers';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { callApiFoodsOfId } from '../redux/action/actionsAsysc';
import './RecipeInProgress.css';

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
    if (target.checked) {
      target.parentNode.className = 'checkbox risk';
    } else {
      target.parentNode.className = 'checkbox';
    }
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
    <>
      <Header title="Food In Progress" />
      <main className="main-recipe-in-progress">
        <img
          className="img-details"
          data-testid="recipe-photo"
          src={ meal.strMealThumb }
          alt={ meal.strMeal }
        />
        <div className="title-section">
          <h2 className="title-recipe" data-testid="recipe-title">{meal.strMeal}</h2>
          <div>
            <button className="btn-details" type="button" onClick={ linkCopied }>
              <img data-testid="share-btn" src={ shareIcon } alt="share-icon" />
            </button>
            <button
              type="button"
              className="btn-details"
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
          </div>
        </div>
        {messageLinkCopied && <p>Link copied!</p>}
        <p
          className="category-recipe"
          data-testid="recipe-category"
        >
          {meal.strCategory}
        </p>
        <div className="ingredients-container">
          {ingredients.map((ingredient, index) => (
            <div className="checked-recipes" key={ index }>
              <label
                data-testid={ `${index}-ingredient-step` }
                htmlFor={ `ingredient-${index}` }
              >
                <input
                  id={ `ingredient-${index}` }
                  name={ `ingredient-${index}` }
                  className="checkbox"
                  type="checkbox"
                  value={ `${ingredient[1]} - ${measures[index][1]}` }
                  checked={ inProgress
                    .includes(`${ingredient[1]} - ${measures[index][1]}`) }
                  onChange={ handleCheckbox }
                />
                {`${ingredient[1]} - ${measures[index][1]}`}
              </label>
            </div>
          ))}
        </div>
        <div className="instructions-section">
          <h2>Instructions</h2>
          <p data-testid="instructions">{meal.strInstructions}</p>
        </div>
        <div className="finish-recipe">
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
        </div>
      </main>
    </>
  );
}

RecipeMealsInProgress.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
