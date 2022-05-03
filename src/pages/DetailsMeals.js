import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { callApiDrinks, callApiFoodsOfId } from '../redux/action/actionsAsysc';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import CardDrinksCarousel from '../components/CardDrinksCarousel';

export default function DetailsMeals(props) {
  const { location: { pathname } } = props;
  const mealId = (pathname.match(/([0-9])\w+/g))[0];
  const dispatch = useDispatch();
  const re = /watch\?v=/gi;
  const history = useHistory();

  useEffect(() => {
    dispatch(callApiFoodsOfId(mealId));
    dispatch(callApiDrinks('', 'all'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const meal = useSelector((state) => state.mealsReducer.meal);

  let ingredients = [];
  const itemsIngredients = Object.entries(meal);
  ingredients = itemsIngredients.filter((item) => item[0]
    .includes('strIngredient') && item[1]);

  let measures = [];
  const itemsMeasures = Object.entries(meal);
  measures = (itemsMeasures.filter((item) => item[0]
    .includes('strMeasure') && item[1]));

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
      <button
        className="btn-start-recipe"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`/foods/${mealId}/in-progress`) }
      >
        Start Recipe
      </button>
    );
  }

  return (
    <div>
      <img data-testid="recipe-photo" src={ meal.strMealThumb } alt={ meal.strMeal } />
      <h1 data-testid="recipe-title">{ meal.strMeal }</h1>
      <button type="button" data-testid="share-btn">
        <img src={ shareIcon } alt="share-icon" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="white-heart-icon" />
      </button>
      <p data-testid="recipe-category">{ meal.strCategory }</p>
      <h2>Ingredients</h2>
      {ingredients.map((item, index) => (
        <p
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${item[1]} - ${measures[index][1]}`}
        </p>))}
      <h2>Instructions</h2>
      <p data-testid="instructions">{ meal.strInstructions }</p>
      <h2>Video</h2>
      <iframe
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
      <h2>Recommend</h2>
      {/* <p data-testid={ `${index}-recomendation-card` } /> */}
      <CardDrinksCarousel mazimumArraySize={ 6 } testid="-recomendation-card" />
      {actionButton()}
    </div>
  );
}

DetailsMeals.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
