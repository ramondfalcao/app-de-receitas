/* eslint-disable react/jsx-max-depth */
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
import Header from '../components/Header';

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
    <>
      <Header title="Drink In Progress" />
      <main className="main-recipe-in-progress">
        <img
          className="img-details"
          data-testid="recipe-photo"
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
        />
        <div className="title-section">
          <h2 data-testid="recipe-title">{drink.strDrink}</h2>
          <div>
            <button type="button" className="btn-details" onClick={ linkCopied }>
              <img data-testid="share-btn" src={ shareIcon } alt="share-icon" />
            </button>
            <button
              type="button"
              className="btn-details"
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
          </div>
        </div>
        {messageLinkCopied && <p>Link copied!</p>}
        <p
          className="category-recipe"
          data-testid="recipe-category"
        >
          {drink.strCategory}
        </p>
        <div className="ingredients-container">
          {ingredients.map((ingredient, index) => (
            <div className="checked-recipes" key={ index }>
              <label
                key={ index }
                data-testid={ `${index}-ingredient-step` }
                htmlFor={ `ingredient-${index}` }
              >
                <input
                  id={ `ingredient-${index}` }
                  className="checkbox"
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
            </div>
          ))}
        </div>
        <div className="instructions-section">
          <h2>Instructions</h2>
          <p data-testid="instructions">{drink.strInstructions}</p>
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

RecipeDrinksInProgress.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
