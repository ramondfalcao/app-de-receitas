import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import copy from 'clipboard-copy';
import { callApiDrinkOfId, callApiFoods } from '../redux/action/actionsAsysc';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import CardMealsCarousel from '../components/CardMealsCarousel';

const EXPOSURE_TIME = 5000;
export default function DetailsDrinks(props) {
  const { location: { pathname } } = props;
  const [messageLinkCopied, setMessageLinkCopied] = useState(false);
  const drinkId = (pathname.match(/([0-9])\w+/g))[0];
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(callApiDrinkOfId(drinkId));
    dispatch(callApiFoods('', 'all'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const drink = useSelector((state) => state.drinksReducer.drink);

  let ingredients = [];
  const itemsIngredients = Object.entries(drink);
  ingredients = itemsIngredients.filter((item) => item[0]
    .includes('strIngredient') && item[1]);

  let measures = [];
  const itemsMeasures = Object.entries(drink);
  measures = (itemsMeasures.filter((item) => item[0]
    .includes('strMeasure')));

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
        <button
          className="btn-start-recipe"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`/drinks/${drinkId}/in-progress`) }
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
        onClick={ () => history.push(`/drinks/${drinkId}/in-progress`) }
      >
        Start Recipe
      </button>
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
    <div>
      <img
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
      />
      <h1 data-testid="recipe-title">{ drink.strDrink }</h1>
      <button type="button" data-testid="share-btn" onClick={ linkCopied }>
        <img src={ shareIcon } alt="share-icon" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="white-heart-icon" />
      </button>
      {messageLinkCopied && <p>Link copied!</p>}
      <p data-testid="recipe-category">{ `${drink.strCategory} ${drink.strAlcoholic}`}</p>
      <h2>Ingredients</h2>
      {ingredients.map((item, index) => (
        <p
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          { measures[index][1] ? `${item[1]} - ${measures[index][1]}` : item[1] }
        </p>))}
      <h2>Instructions</h2>
      <p data-testid="instructions">{ drink.strInstructions }</p>
      {/* <p data-testid={ `${index}-recomendation-card` } /> */}
      <CardMealsCarousel mazimumArraySize={ 6 } testid="-recomendation-card" />
      {actionButton()}
    </div>
  );
}

DetailsDrinks.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
