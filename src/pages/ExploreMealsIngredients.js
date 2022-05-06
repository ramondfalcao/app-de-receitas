import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { loadingAll } from '../redux/action';
import { callApiFoods, callApiMealIngredients } from '../redux/action/actionsAsysc';

export default function ExploreMealsIngredients() {
  const history = useHistory();
  const dispatch = useDispatch();
  const doze = 12;
  const ingredients = useSelector((state) => state.mealsReducer.ingredients);
  const showIngredients = ingredients.slice(0, doze);
  console.log(showIngredients);

  useEffect(() => {
    dispatch(callApiMealIngredients());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (ingredient) => {
    dispatch(callApiFoods(ingredient, 'ingredients'));
    dispatch(loadingAll(false));
    history.push('/foods');
  };
  return (
    <div>
      <Header title="Explore Ingredients" search={ false } />
      {showIngredients.map((item, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => handleClick(item.strIngredient) }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
            alt={ item.strIngredient }
          />
          <p data-testid={ `${index}-card-name` }>{item.strIngredient}</p>
        </button>
      ))}
      <Footer />
    </div>
  );
}
