/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import copy from 'clipboard-copy';
import { callApiDrinkOfId, callApiFoods } from '../redux/action/actionsAsysc';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import CardMealsCarousel from '../components/CardMealsCarousel';
import { favoriteDrinksLocalStorage } from '../helpers/helpers';
import Header from '../components/Header';

const EXPOSURE_TIME = 5000;
export default function DetailsDrinks(props) {
  const { location: { pathname } } = props;
  const [messageLinkCopied, setMessageLinkCopied] = useState(false);
  const [favoriteButton, setFavoriteButton] = useState(false);
  const drinkId = (pathname.match(/([0-9])\w+/g))[0];
  const dispatch = useDispatch();
  const history = useHistory();
  const drink = useSelector((state) => state.drinksReducer.drink);
  const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));

  console.log(drink);

  useEffect(() => {
    dispatch(callApiDrinkOfId(drinkId));
    dispatch(callApiFoods('', 'all'));
    setFavoriteButton(favorite && favorite.some(({ id }) => +drinkId === +id));
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

  function handleClickBTNStartRecipe() {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    inProgress.cocktails[drinkId] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    history.push(`/drinks/${drinkId}/in-progress`);
  }

  function actionButton() {
    const done = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const isTrueDone = done && done.some(({ id }) => +id === +drinkId);
    if (isTrueDone) {
      return null;
    }
    const isTrueinProgress = inProgress && Object.keys(inProgress.cocktails)
      .some((id) => +id === +drinkId);
    if (isTrueinProgress) {
      return (
        <div className="continue-recipe">
          <button
            className="btn-continue-recipe"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => history.push(`/drinks/${drinkId}/in-progress`) }
          >
            Continue Recipe
          </button>
        </div>
      );
    }

    console.log(favoriteButton);
    console.log(ingredients);

    return (
      <div className="start-recipe">
        <button
          className="btn-start-recipe"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleClickBTNStartRecipe }
        >
          Start Recipe
        </button>
      </div>
    );
  }

  function linkCopied() {
    copy(`http://localhost:3000${pathname}`);
    setMessageLinkCopied(true);
    setTimeout(() => {
      setMessageLinkCopied(false);
    }, EXPOSURE_TIME);
  }

  return (
    <>
      <Header title="Details" />
      <main className="main-details">
        <img
          className="img-details"
          data-testid="recipe-photo"
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
        />
        <div className="title-section">
          <h1 data-testid="recipe-title">{ drink.strDrink }</h1>
          <div>
            <button className="btn-details" type="button" onClick={ linkCopied }>
              <img src={ shareIcon } alt="share-icon" />
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
        <p>{ `${drink.strCategory} ${drink.strAlcoholic}`}</p>
        <div className="ingredients-section">
          <h2>Ingredients</h2>
          {ingredients.map((item, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { measures[index][1] ? `${item[1]} - ${measures[index][1]}` : item[1] }
            </p>
          ))}
        </div>
        <div className="recommend-section">
          <h2>Instructions</h2>
          <p data-testid="instructions">{ drink.strInstructions }</p>
          <CardMealsCarousel mazimumArraySize={ 6 } testid="-recomendation-card" />
          {actionButton()}
        </div>
      </main>
    </>
  );
}

DetailsDrinks.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
