import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardMeals from '../components/CardMeals';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { callApiFoods } from '../redux/action/actionsAsysc';

export default function Foods(props) {
  const { history } = props;
  const foods = useSelector((state) => state.mealsReducer.meals);

  function renderMeals() {
    if (foods === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (foods.length === 1) {
      return history.push(`/foods/${foods[0].idMeal}`);
    }
    return <CardMeals />;
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(callApiFoods('', 'all'));
    dispatch(callApiFoods('', 'categories'));
  }, []);

  const categories = useSelector((state) => state.mealsReducer.categories);
  const MAXIMUM_ARRAY_SIZE = 5;
  let buttonsCategories = [];
  if (categories !== undefined) {
    buttonsCategories = categories.slice(0, MAXIMUM_ARRAY_SIZE);
  }

  const requestFilter = async ({ target }) => {
    const { name } = target;
    dispatch(callApiFoods(name, 'filter'));
  };

  return (
    <div>
      <Header title="Foods" search />
      { buttonsCategories && buttonsCategories.map((category, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ requestFilter }
          name={ category.strCategory }
        >
          {category.strCategory}
        </button>
      ))}
      { renderMeals() }
      <Footer />
    </div>
  );
}

Foods.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
