import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { loadingAll } from '../redux/action';
import { callApiDrinkIngredients, callApiDrinks } from '../redux/action/actionsAsysc';

export default function ExploreDrinksIngredients() {
  const history = useHistory();
  const dispatch = useDispatch();
  const doze = 12;
  const ingredients = useSelector((state) => state.drinksReducer.ingredients);
  const showIngredients = ingredients.slice(0, doze);
  console.log(showIngredients);

  useEffect(() => {
    dispatch(callApiDrinkIngredients());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (ingredient) => {
    dispatch(callApiDrinks(ingredient, 'ingredients'));
    dispatch(loadingAll(false));
    history.push('/drinks');
  };

  return (
    <div>
      <Header title="Explore Ingredients" search={ false } />
      {showIngredients.map((item, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => handleClick(item.strIngredient1) }
        >
          <img data-testid={ `${index}-card-img` } src={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` } alt={ item.strIngredient1 } />
          <p data-testid={ `${index}-card-name` }>{item.strIngredient1}</p>
        </button>
      ))}
      <Footer />
    </div>
  );
}
