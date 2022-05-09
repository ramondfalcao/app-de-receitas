import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { callApiDrinks, callApiFoodsOfId } from '../redux/action/actionsAsysc';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import CardDrinksCarousel from '../components/CardDrinksCarousel';
import { favoriteMealsLocalStorage } from '../helpers/helpers';
import './DetailsMeals.css';

const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));

const EXPOSURE_TIME = 5000;

export default function DetailsMeals(props) {
  const { location: { pathname } } = props;
  const [messageLinkCopied, setMessageLinkCopied] = useState(false);
  const [favoriteButton, setFavoriteButton] = useState(false);
  const mealId = (pathname.match(/([0-9])\w+/g))[0];
  const dispatch = useDispatch();
  const re = /watch\?v=/gi;
  const history = useHistory();
  const meal = useSelector((state) => state.mealsReducer.meal);

  useEffect(() => {
    dispatch(callApiFoodsOfId(mealId));
    dispatch(callApiDrinks('', 'all'));
    setFavoriteButton(favorite && favorite.some(({ id }) => +mealId === +id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let ingredients = [];
  const itemsIngredients = Object.entries(meal);
  ingredients = itemsIngredients.filter((item) => item[0]
    .includes('strIngredient') && item[1]);

  let measures = [];
  const itemsMeasures = Object.entries(meal);
  measures = (itemsMeasures.filter((item) => item[0]
    .includes('strMeasure') && item[1]));

  function handleClickBTNStartRecipe() {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    inProgress.meals[mealId] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    history.push(`/foods/${mealId}/in-progress`);
  }

  function actionButton() {
    const done = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const isTrueDone = done && done.some(({ id }) => +id === +mealId);
    if (isTrueDone) {
      return null;
    }
    const isTrueinProgress = inProgress && Object.keys(inProgress.meals)
      .some((id) => +id === +mealId);
    if (isTrueinProgress) {
      return (
        <button
          className="btn-start-recipe"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`/foods/${mealId}/in-progress`) }
        >
          Continue Recipe
        </button>
      );
    }
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
    <main className="main-details">
      <img
        className="img-details"
        data-testid="recipe-photo"
        src={ meal.strMealThumb }
        alt={ meal.strMeal }
      />
      <div className="title-section">
        <h1 data-testid="recipe-title">{ meal.strMeal }</h1>
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
                />
              )
            )}
          </button>
        </div>
      </div>
      {messageLinkCopied && <p>Link copied!</p>}
      <p data-testid="recipe-category">{ meal.strCategory }</p>
      <div className="ingredients-section">
        <h2>Ingredients</h2>
        {ingredients.map((item, index) => (
          <p
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${item[1]} - ${measures[index][1]}`}
          </p>))}
      </div>
      <div className="instructions-section">
        <h2>Instructions</h2>
        <p data-testid="instructions">{ meal.strInstructions }</p>
      </div>
      <div className="video-section">
        <h2>Video</h2>
        <iframe
          className="video"
          data-testid="video"
          width="560"
          height="315"
          src={ meal.strYoutube && meal.strYoutube.replace(re, 'embed/') }
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write;
        encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="recommend-section">
        <h2>Recommend</h2>
        <CardDrinksCarousel mazimumArraySize={ 6 } testid="-recomendation-card" />
        {actionButton()}
      </div>
    </main>
  );
}

DetailsMeals.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
