import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { callApiFoodRandom } from '../redux/action/actionsAsysc';

export default function ExploreMeals() {
  const history = useHistory();
  const dispatch = useDispatch();
  const meal = useSelector((state) => state.mealsReducer.meal);

  useEffect(() => {
    dispatch(callApiFoodRandom());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header title="Explore Foods" search={ false } />
      <section>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/foods/ingredients') }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => history.push('/explore/foods/nationalities') }
        >
          By Nationality
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => history.push(`/foods/${meal.idMeal}`) }
        >
          Surprise me!
        </button>
      </section>
      <Footer />
    </>
  );
}
