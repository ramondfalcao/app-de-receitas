import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { callApiDrinkRandom } from '../redux/action/actionsAsysc';
import './ExploreMealsAndDrinks.css';

export default function ExploreDrinks() {
  const history = useHistory();
  const dispatch = useDispatch();
  const drink = useSelector((state) => state.drinksReducer.drink);
  console.log(drink);

  useEffect(() => {
    dispatch(callApiDrinkRandom());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header title="Explore Drinks" search={ false } />
      <section className="section-buttons-explore">
        <button
          type="button"
          className="explore-btn"
          id="explore-ingredient-drink"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/drinks/ingredients') }
        >
          By Ingredient
        </button>
        <button
          type="button"
          className="explore-btn"
          data-testid="explore-surprise"
          onClick={ () => history.push(`/drinks/${drink.idDrink}`) }
        >
          Surprise me!
        </button>
      </section>
      <Footer />
    </>
  );
}
